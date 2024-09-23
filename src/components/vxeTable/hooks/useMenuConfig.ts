export const useMenuConfig = () => {
  return {
    menuConfig: {
      enabled: true,
      header: {
        options: [
          [
            {
              code: "exportAll",
              name: "导出所有.csv",
              prefixConfig: { icon: "vxe-icon-download" },
              visible: true,
              disabled: false
            }
          ]
        ]
      },
      body: {
        options: [
          [
            {
              code: "copy",
              name: "复制内容（Ctrl+C）",
              prefixConfig: { icon: "vxe-icon-copy" },
              visible: true,
              disabled: false
            },
            { code: "clear", name: "清除内容", visible: true, disabled: false },
            { code: "reload", name: "刷新表格", visible: true, disabled: false }
          ],
          [
            {
              code: "myPrint",
              name: "打印（Ctrl+P）",
              prefixConfig: { icon: "vxe-icon-print" },
              visible: true,
              disabled: false
            },
            {
              code: "myExport",
              name: "导出.csv",
              prefixConfig: { icon: "vxe-icon-download" },
              visible: true,
              disabled: false
            }
          ]
        ]
      },
      footer: {
        options: [
          [
            {
              code: "exportAll",
              name: "导出所有.csv",
              prefixConfig: { icon: "vxe-icon-download" },
              visible: true,
              disabled: false
            }
          ]
        ]
      },
      // 权限控制
      visibleMethod({ options, column }) {
        // 示例：只有 name 列允许操作，清除按钮只能在 sex 才显示
        // 显示之前处理按钮的操作权限
        const isDisabled = !column || column.field !== "name";
        const isVisible = column && column.field === "sex";
        options.forEach(list => {
          list.forEach(item => {
            if (item.code === "copy") {
              item.disabled = isDisabled;
            }
            if (item.code === "clear") {
              item.visible = isVisible;
            }
          });
        });
        return true;
      }
    }
  };
};
