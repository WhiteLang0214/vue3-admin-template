import { defineComponent } from "vue";
import type { RouteRecordRaw, RouteMeta } from "vue-router";

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  path: string;
  name: string;
  redirect?: string;
  component?: Component | string;
  meta?: RouteMeta;
}

export type AppRouteModule = AppRouteRecordRaw;
