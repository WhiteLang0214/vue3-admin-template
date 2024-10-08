import { AppRouteRecordRaw } from "@/router/types";
import { $t } from "@/plugins/i18n";
/**
 * 登陆路由
 */
const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: $t("routes.static.login"),
    sort: 1,
  },
};

export default LoginRoute;
