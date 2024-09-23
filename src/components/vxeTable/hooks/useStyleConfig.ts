import { isFunction } from "xe-utils";

// 动态样式 - 表格头列样式
export const useHeaderCellStyle = (callback: Function) => {
  return {
    headerCellStyle: (gridData) => {
      if (callback && isFunction(callback)) {
        return callback(gridData);
      }
    },
  };
};

// 动态样式 - 表格头行样式
export const useRowStyle = (callback: Function) => {
  return {
    rowStyle: (gridData) => {
      if (callback && isFunction(callback)) {
        return callback(gridData);
      }
    },
  };
};

export const useCellStyle = (callback: Function) => {
  return {
    cellStyle: (cellData) => {
      if (callback && isFunction(callback)) {
        return callback(cellData);
      }
    },
  };
};
