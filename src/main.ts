import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './assets/main.css'

import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Tooltip from 'primevue/tooltip'
import Card from 'primevue/card'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice' 

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark' }
  }
})

app.use(ConfirmationService) 
app.component('DataView', DataView)
app.component('InputNumber', InputNumber)
app.component('Button', Button)
app.component('Card', Card)
app.component('ConfirmDialog', ConfirmDialog)
app.directive('tooltip', Tooltip)

app.mount('#app')