// 高亮列
export const useHighlightColumnConfig = () => {
  return {
    isCurrent: true,
    currentMethod({ column }) {
      if (column.field === "age") {
        return false;
      }
      return true;
    }
  };
};

// 拖拽调整列宽
export const useColumnResizeble = () => {
  return {
    resizable: true
  };
};

// 列配置
export const useColumnConfig = () => {
  return {
    columnConfig: {
      isHover: true,
      ...useHighlightColumnConfig(),
      ...useColumnResizeble()
    }
  };
};
