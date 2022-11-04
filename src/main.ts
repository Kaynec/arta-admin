import { createApp } from "vue";
import App from "./App.vue";
import "@unocss/reset/tailwind.css";

import Notifications from "@kyvg/vue3-notification";

import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import "uno.css";
import "./styles/app.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Layouts initialization
import { setupLayouts } from "virtual:generated-layouts";

// Router initialization
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";
const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const auth = to.meta["auth"] || false;

  // page  does not require auth
  if (!auth) {
    if (!useAdminStore().isAuthenticated) return next();
    return next({ name: "Home" });
  }
  // page  does require auth
  else if (auth) {
    if (useAdminStore().isAuthenticated) return next();
    return next({ name: "Login" });
  }
});

// App creation
createApp(App)
  .use(Quasar)
  .use(pinia)
  .use(Notifications)
  .use(router)
  .mount("#app");
