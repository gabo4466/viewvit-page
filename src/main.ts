import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// PRIME COMPONENTS
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.use(PrimeVue, { ripple: true });

/*
    Componentes de PrimeVue globales
    app.component(componentName)
*/

app.component("InputText", InputText);
app.component("Button", Button);
app.component("Checkbox", Checkbox);

app.mount("#app");
