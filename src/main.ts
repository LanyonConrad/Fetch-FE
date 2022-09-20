import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);

app.mount('#app')