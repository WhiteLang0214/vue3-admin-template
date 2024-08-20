import type { App } from "vue";
import ElementPlus from "element-plus";
import "dayjs/locale/zh-cn";

export default (app: App) => app.use(ElementPlus, { size: "small" });
