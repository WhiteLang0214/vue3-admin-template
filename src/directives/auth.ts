import type { App } from "vue";

/**
 * 页面按钮权限指令
 * @param app
 */

export default (app: App) => {
  app.directive("auth", {
    mounted(el, binding) {
      console.log(el, binding);
    },
  });
};
