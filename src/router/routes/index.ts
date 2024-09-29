/**
 * 基础路由-静态路由
 */
import { AppRouteRecordRaw } from "@/router/types";
import { $t } from "@/plugins/i18n";
const NotFound = () => import("@/views/NotFound/index.vue");

// 根路由
const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: "/login",
  meta: {
    title: "Root",
  },
};
// 登陆路由
const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: $t("routes.static.login"),
    sort: 1,
  },
};
// 错误页面路由
const errorRoutes: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: NotFound,
  meta: {},
};

const basicRoutes = [LoginRoute, RootRoute, errorRoutes];
export { basicRoutes };
