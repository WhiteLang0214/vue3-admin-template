import type { VxeGridInstance, VxeColumnPropTypes } from "vxe-table";

// 修改指定列的宽度
export const useChangeColumnWidth = (
  gridRef: VxeGridInstance,
  columnName: string,
  width: number
) => {
  gridRef && gridRef.setColumnWidth(columnName, width);
};

// 尾部方法
export const useFooterMethod = ({ columns }) => {
  // 尾部合计
  const footerData = [
    columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return "合计";
      }
      if (["date"].includes(column.field)) {
        return "2020-09-05";
      }
      if (["rate"].includes(column.field)) {
        return 999.8;
      }
      return null;
    })
  ];
  return footerData;
};

// 设置冻结列
export const useToggleFixedColumn = (
  gridRef: VxeGridInstance,
  field: VxeColumnPropTypes.Field,
  type: VxeColumnPropTypes.Fixed
) => {
  const $grid = gridRef;
  if ($grid) {
    const column = $grid.getColumnByField(field);
    if (column) {
      if (column.fixed) {
        $grid.clearColumnFixed(column);
      } else {
        $grid.setColumnFixed(column, type);
      }
    }
  }
};
