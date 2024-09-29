import "vue-router";

interface RouteMeta {
  // 路由是否登陆验证
  requireAuth: boolean;
}

interface RouteConfigTable {
  path: string;
  name: string;
  component: RouteComponent;
}
