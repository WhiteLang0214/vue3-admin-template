/// <reference types="vite/client" />

// 定义后缀.vue文件类型
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}

declare module "element-plus";
