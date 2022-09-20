<script setup lang="ts">
import { ref, type Ref } from 'vue'

// form input values
const nameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const occupationInput = ref("");
const stateInput = ref("");

const invalidOccupationInput = ref(false);
const invalidStateInput = ref(false);

interface State { name: string, abbreviation: string }

const states: Ref<State[]> = ref([]);
const occupations: Ref<string[]> = ref([])

const isSubmittingForm = ref(false);
const submissionError = ref(false);

const emit = defineEmits(["submitted"]);

// fetch state and occupation options
fetch('https://frontend-take-home.fetchrewards.com/form')
  .then((response) => response.json())
  .then((data) => {
    states.value = data.states;
    occupations.value = data.occupations
  });

function submitForm() {

  if (isSubmittingForm.value || submissionError.value) {
    return;
  }

  isSubmittingForm.value = true;

  if (!stateInput.value) {
    invalidStateInput.value = true;
  }
  if (!occupationInput.value) {
    invalidOccupationInput.value = true;
  }
  if (invalidStateInput.value || invalidOccupationInput.value) {
    isSubmittingForm.value = false;
    return;
  }

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    occupation: occupationInput.value,
    state: stateInput.value
  }
  console.log(data);

  fetch('https://frontend-take-home.fetchrewards.com/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        emit("submitted");
      } else {
        submissionError.value = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      submissionError.value = true;
    }).then(() => {
      isSubmittingForm.value = false;
    });
}

</script>

<template>

  <form @submit.prevent="submitForm">

    <span class="p-float-label">
      <InputText id="name" type="text" v-model="nameInput" :required="true" />
      <label for="name">Name</label>
    </span>

    <span class="p-float-label">
      <InputText id="email" type="email" v-model="emailInput" :required="true" />
      <label for="email">Email</label>
    </span>

    <span class="p-float-label">
      <Password inputId="password" v-model="passwordInput" :feedback="false" :toggleMask="true" :required="true" />
      <label for="password">Password</label>
    </span>

    <span class="p-float-label">
      <Dropdown v-model="occupationInput" :options="occupations" @focus="invalidOccupationInput = false"
        :class="{'p-invalid': invalidOccupationInput}" aria-labelledby="occupationLabel" />
      <label id="occupationLabel">Occupation</label>
    </span>

    <span class="p-float-label">
      <Dropdown v-model="stateInput" optionLabel="name" :options="states" @focus="invalidStateInput = false"
        :class="{'p-invalid': invalidStateInput}" aria-labelledby="stateLabel" />
      <label id="stateLabel">State</label>
    </span>

    <Button :label="isSubmittingForm ? 'Submitting...' : 'Submit'" :loading="isSubmittingForm" type="submit" />

  </form>

  <Dialog header="Uh Oh!" v-model:visible="submissionError" style="max-width: 80%" :modal="true" :dismissableMask="true">
    There was a problem submitting the form. Please try again.
  </Dialog>

</template>
