export const useRowConfig = () => {
  return {
    rowConfig: {
      useKey: true, // 每一行VNode 设置 key 属性
      keyField: "id", // 行数据唯一主键
      isCurrent: true, // 鼠标点击高亮行
      isHover: true, // 鼠标移入行，高亮当前行
      height: 32, // 行高度
    },
  };
};
