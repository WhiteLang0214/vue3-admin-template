import { AppRouteRecordRaw } from "@/router/types";

const StaticRoute: AppRouteRecordRaw[] = [
  {
    path: "/test/table",
    name: "测试表格",
    component: () => import("@/views/test/vxeTable.vue"),
    meta: {},
  },
];

export default StaticRoute;
