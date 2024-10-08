/**
 * 基础路由-静态路由
 */
import { AppRouteRecordRaw } from "@/router/types";
import LoginRoute from "./modules/loginRoute";
import ErrorRoutes from "./modules/errorRoutes";
import StaticRoute from "./modules/staticRoute";
// 根路由
const LayoutRoute: AppRouteRecordRaw = {
  path: "/",
  name: "layout",
  alias: ["/"],
  component: () => import("@/views/layout/index.vue"),
  // 重定向
  redirect: "/test/table",
  children: [...StaticRoute],
};

const basicRoutes = [
  // RootRoute,
  LoginRoute,
  LayoutRoute,
  ErrorRoutes,
];
export { basicRoutes };
