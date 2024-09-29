import VXETable from "vxe-table";
import VXETablePluginExportXLSX from "vxe-table-plugin-export-xlsx";
import ExcelJS from "exceljs";
import VXETablePluginExportPDF from "vxe-table-plugin-export-pdf";
import { jsPDF } from "jspdf";

// 导出表格
const registerExcel = () => {
  VXETable.use(VXETablePluginExportXLSX, {
    ExcelJS,
  });
};

// 导出 pdf
const registerPdf = () => {
  VXETable.use(VXETablePluginExportPDF, {
    jsPDF,
  });
};

export { registerExcel, registerPdf };
