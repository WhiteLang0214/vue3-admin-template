import VXETABlE from "vxe-table";
import { VxeImage, VxeUI } from "vxe-pc-ui";

export default () => {
  console.log(1, VxeUI.renderer.add);
  VxeUI.renderer.add("nameCellRender", {
    renderTableDefault(params) {
      console.log("params:", params);
    },
    // renderTableCell(params) {
    //   console.log("renderTableCell:", params);
    // },
  });
};
