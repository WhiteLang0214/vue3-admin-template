<template>
  <div>
    <div>
      <vxe-button @click="useChangeColumnWidth(gridRef, 'name', 300)"
        >修改name=300宽度</vxe-button
      >
      <vxe-button @click="useChangeColumnWidth(gridRef, 'name', 400)"
        >修改name=400宽度</vxe-button
      >
    </div>
    <div>
      <vxe-button @click="useToggleFixedColumn(gridRef, 'date', 'left')"
        >设置date列固定</vxe-button
      >
      <vxe-button @click="useToggleFixedColumn(gridRef, 'address', 'right')"
        >设置address列固定</vxe-button
      >
    </div>
    <div>
      <vxe-button type="info" @click="updateColumnDate"
        >更新列与数据</vxe-button
      >
    </div>
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { VxeUI } from "vxe-pc-ui";
import type {
  VxeGridInstance,
  VxeGridProps,
  VxeGridListeners,
  VxeColumnPropTypes,
  VxeTablePropTypes,
  VxeTableDefines,
} from "vxe-table";
import {
  useChangeColumnWidth,
  useFooterMethod,
  useToggleFixedColumn,
} from "@/components/vxeTable/hooks/useMethods";
import {
  useHeaderCellStyle,
  useRowStyle,
  useCellStyle,
} from "@/components/vxeTable/hooks/useStyleConfig";
import { useColumnConfig } from "@/components/vxeTable/hooks/useColumnConfig";
import { useRowConfig } from "@/components/vxeTable/hooks/useRowConfig";
import {
  useLoading,
  useLoadingConfig,
} from "@/components/vxeTable/hooks/useLoadingConfig";
import "@/components/vxeTable/utils/formatter";
import {
  columns,
  gridData,
  columns1,
  gridData1,
} from "@/components/vxeTable/staticData";
import { useRadioConfig } from "@/components/vxeTable/hooks/useRadioOrCheckedConfig";
import XEUtils from "xe-utils";

interface RowVO {
  name: string;
  role: string;
  date: string;
  rate: number;
  address: string;
  content: string;
  sex: string;
  age: number;
}

const gridRef = ref<VxeGridInstance>();

// 表格配置项
let gridOptions = reactive<
  VxeGridProps<RowVO> & {
    menuConfig: VxeTablePropTypes.MenuConfig<RowVO>;
  }
>({
  ...useRowConfig(),
  ...useRadioConfig("name"),
  ...useLoadingConfig(),
  showHeader: true, // 显示表头
  showFooter: true, // 显示尾部
  footerMethod: (gridData) => useFooterMethod(gridData),
  footerData: [
    // 多行表尾数据
    { name: "合计", num: "￥282" },
    { name: "平均", num: "2.88 元" },
  ],
  // 动态样式
  ...useHeaderCellStyle(({ column }) => {
    if (column.field === "name") {
      return {
        backgroundColor: "#f60",
        color: "#ffffff",
      };
    }
  }),
  ...useRowStyle(({ rowIndex }) => {
    const keys = [1, 2];
    const style = {
      backgroundColor: "red",
      color: "#ffffff",
    };
    if (keys.includes(rowIndex)) {
      return style;
    }
  }),
  ...useCellStyle(({ column, row }) => {
    {
      if (column.field === "sex") {
        if (row.sex >= "1") {
          return {
            backgroundColor: "#187",
          };
        } else if (row.age === 26) {
          return {
            backgroundColor: "#2db7f5",
          };
        }
      }
    }
  }),
  // 列配置
  ...useColumnConfig(),
  sortConfig: {
    // 服务端排序
    remote: true,
  },
  filterConfig: {
    // 服务端筛选
    remote: true,
  },
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
            disabled: false,
          },
        ],
      ],
    },
    body: {
      options: [
        [
          {
            code: "copy",
            name: "复制内容（Ctrl+C）",
            prefixConfig: { icon: "vxe-icon-copy" },
            visible: true,
            disabled: false,
          },
          { code: "clear", name: "清除内容", visible: true, disabled: false },
          { code: "reload", name: "刷新表格", visible: true, disabled: false },
        ],
        [
          {
            code: "myPrint",
            name: "打印（Ctrl+P）",
            prefixConfig: { icon: "vxe-icon-print" },
            visible: true,
            disabled: false,
          },
          {
            code: "myExport",
            name: "导出.csv",
            prefixConfig: { icon: "vxe-icon-download" },
            visible: true,
            disabled: false,
          },
        ],
      ],
    },
    footer: {
      options: [
        [
          {
            code: "exportAll",
            name: "导出所有.csv",
            prefixConfig: { icon: "vxe-icon-download" },
            visible: true,
            disabled: false,
          },
        ],
      ],
    },
    // 权限控制
    visibleMethod({ options, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 sex 才显示
      // 显示之前处理按钮的操作权限
      const isDisabled = !column || column.field !== "name";
      const isVisible = column && column.field === "sex";
      options.forEach((list) => {
        list.forEach((item) => {
          if (item.code === "copy") {
            item.disabled = isDisabled;
          }
          if (item.code === "clear") {
            item.visible = isVisible;
          }
        });
      });
      return true;
    },
  },
  // 工具栏
  toolbarConfig: {
    buttons: [
      { name: "新增", code: "add", status: "primary" },
      { name: "删除", code: "del", status: "error" },
      { name: "保存", code: "save", status: "success" },
    ],
  },
  columns: columns,
  data: gridData,
});

const remoteFindList = (
  field?: VxeColumnPropTypes.Field,
  order?: VxeTablePropTypes.SortOrder,
) => {
  useLoading(gridOptions, true);
  // 模拟接口
  return new Promise<RowVO[]>((resolve) => {
    setTimeout(() => {
      useLoading(gridOptions, false);
      const mockList = gridData1;
      if (field && order) {
        const rest: RowVO[] = XEUtils.orderBy(mockList, { field, order });
        gridOptions.data = rest;
        resolve(rest);
      } else {
        gridOptions.data = mockList;
        resolve(mockList);
      }
    }, 300);
  });
};

const remoteFilterList = (
  filterField: string,
  filterList?: VxeTableDefines.FilterCheckedParams<RowVO>[],
) => {
  useLoading(gridOptions, true);
  // 模拟接口
  return new Promise<RowVO[]>((resolve) => {
    setTimeout(() => {
      useLoading(gridOptions, false);
      const mockList = gridData1;
      if (filterList && filterList.length) {
        const firstItem = filterList[0];
        const values = firstItem.values;
        const rest: RowVO[] = mockList.filter((item) =>
          values.includes(item[filterField]),
        );
        gridOptions.data = rest;
        resolve(rest);
      } else {
        gridOptions.data = mockList;
        resolve(mockList);
      }
    }, 300);
  });
};

const gridEvents: VxeGridListeners<RowVO> = {
  sortChange({ field, order }) {
    remoteFindList(field, order);
  },
  filterChange({ filterList }) {
    remoteFilterList("sex", filterList);
  },
  menuClick({ menu, row, column }) {
    const $grid = gridRef.value;
    if ($grid) {
      switch (menu.code) {
        case "copy":
          if (row && column) {
            if (VxeUI.clipboard.copy(row[column.field])) {
              VxeUI.modal.message({
                content: "已复制到剪贴板！",
                status: "success",
              });
            }
          }
          break;
        case "clear":
          $grid.clearData(row, column.field);
          break;
        case "myPrint":
          $grid.print();
          break;
        case "myExport":
          $grid.exportData();
          break;
      }
    }
  },
  toolbarButtonClick(params) {
    console.log(params.code);
  },
};

const updateColumnDate = () => {
  useLoading(gridOptions, true);
  setTimeout(() => {
    useLoading(gridOptions, false);
    gridOptions.columns = columns1;
    gridOptions.data = gridData1;
  }, 2000);
};

onMounted(() => {
  useLoading(gridOptions, true);
  setTimeout(() => {
    useLoading(gridOptions, false);
  }, 2000);
});
</script>
