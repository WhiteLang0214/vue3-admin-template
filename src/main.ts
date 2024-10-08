import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import installRouter from "@/router";
import installStore from "@/store";
import installDirectives from "@/directives";
import installPlugins from "@/plugins";

import "virtual:uno.css";

async function start() {
  const app = createApp(App);

  // 注册路由
  installRouter(app);
  // 注册全局状态管理
  installStore(app);
  // 注册全局指令
  installDirectives(app);
  // 注册组件
  installPlugins(app);

  app.mount("#app");
}

start();
