import type { VxeGridInstance, VxeColumnPropTypes } from "vxe-table";

// 修改指定列的宽度
export const useChangeColumnWidth = (
  gridRef: VxeGridInstance,
  columnName: string,
  width: number,
) => {
  gridRef && gridRef.setColumnWidth(columnName, width);
};

const meanNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach((item) => {
    count += Number(item[field]);
  });
  return (count / list.length).toFixed(2);
};

const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach((item) => {
    count += Number(item[field]);
  });
  return count.toFixed(2);
};

// 尾部方法
export const useFooterMethod = ({ columns, data }) => {
  // 尾部合计
  const footerData = [
    columns.map((column, columnIndex) => {
      if (columnIndex === 0) {
        return "合计";
      }
      if (["age"].includes(column.field)) {
        return meanNum(data, column.field) + "岁";
      }
      if (["rate"].includes(column.field)) {
        return sumNum(data, column.field);
      }
      return null;
    }),
  ];
  return footerData;
};

// 设置冻结列
export const useToggleFixedColumn = (
  gridRef: VxeGridInstance,
  field: VxeColumnPropTypes.Field,
  type: VxeColumnPropTypes.Fixed,
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
