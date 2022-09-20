<script setup lang="ts">
import { ref } from 'vue';
import TheForm from './components/TheForm.vue'

const submitted = ref(false);
</script>

<template>
  <header>
    <img alt="Fetch logo" class="logo" src="./assets/fetch-rewards-logo.png" />
  </header>
  <main>
    <TheForm v-if="!submitted" @submitted="submitted = true" />
    <div v-else class="successEl">
      <h1>Thank You!</h1>
      <span>Form submitted successfully</span>
    </div>
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 100%;
  max-width: 300px;
  padding: 1rem 2rem;
}

@media (min-width: 768px) {
  header {
    display: flex;
    place-items: center;
    padding-right: 80px;
  }

  .logo {
    margin: 0 2rem 0 0;
    padding: 0;
  }
}

.successEl {
  margin: 80px 0;
  display: flex;
  flex-direction: column;
  place-items: center;
}

.successEl span {
  margin-top: 1em;
}
</style>
