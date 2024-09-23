// 完整导入 表格库
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
// 完整导入 UI 组件库
import VxeUI from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";

// 可以设置全局参数
VxeUI.setConfig({
  grid: {
    pagerConfig: {
      enabled: true,
      perfect: false,
    },
  },
});

function install(app) {
  app.use(VxeUITable).use(VxeUI);
}

export default install;
