import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { baseRoutes } from "./routes";

const publicPath = import.meta.env.VITE_PUBLIC_PATH;

// 创建路由实例
const router = createRouter({
  // 创建 history 历史记录
  history: createMemoryHistory(publicPath),
  // 添加到路由的初始路由列表
  routes: baseRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 配置路由表
export const setupRouter = (app: App<Element>) => app.use(router);
