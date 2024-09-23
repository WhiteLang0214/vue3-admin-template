import installElementPlus from "@/plugins/elementPlus";
import installVxeTable from "@/plugins/vxeTable";

export default (app) => {
  installElementPlus(app);
  installVxeTable(app);
};
