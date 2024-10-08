import { AppRouteRecordRaw } from "@/router/types";
const NotFound = () => import("@/views/NotFound/index.vue");
/**
 * error页面路由
 */
const errorRoutes: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: NotFound,
  meta: {},
};

export default errorRoutes;
