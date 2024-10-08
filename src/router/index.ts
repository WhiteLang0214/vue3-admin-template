import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { basicRoutes } from "./routes";
console.log("basicRoute:", basicRoutes);
const publicPath = import.meta.env.VITE_PUBLIC_PATH;

// 创建路由实例
const router = createRouter({
  // 创建 history 历史记录
  history: createMemoryHistory(publicPath),
  // 添加到路由的初始路由列表
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠
  strict: true,
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise((resolve) => {
      if (savedPosition) {
        resolve(savedPosition);
      } else {
        if (from.meta.saveScrollTop) {
          const top =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

// 全局导航守卫
router.beforeEach(async (to, from) => {
  // 检查用户是否已登录
  return true;
});

// 全局导航故障
router.afterEach((to, from, failure) => {
  if (failure) {
    console.log("afterEach--", failure);
  }
});

export default (app: App<Element>) => app.use(router);
