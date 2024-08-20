import { createPinia } from "pinia";
import type { App } from "vue";

export default (app: App<Element>) => app.use(createPinia());
