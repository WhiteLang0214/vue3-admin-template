export const useRowHeight = (height: number = 32) => {
  return {
    height
  };
};

// 设置行高
export const useRowConfig = (rowConfig: Object = {}) => {
  return {
    rowConfig: {
      ...useRowHeight(),
      ...rowConfig
    }
  };
};
