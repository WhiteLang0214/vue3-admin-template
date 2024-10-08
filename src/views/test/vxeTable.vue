<template>
  <div>
    <el-space direction="vertical">
      <div style="display: flex; justify-content: flex-start">
        <vxe-button
          @click="useChangeColumnWidth(gridRef, 'name', 300)"
          size="mini"
          >修改name=300宽度</vxe-button
        >
        <vxe-button
          @click="useChangeColumnWidth(gridRef, 'name', 400)"
          size="mini"
          >修改name=400宽度</vxe-button
        >
      </div>
      <div style="display: flex; justify-content: flex-start">
        <vxe-button
          @click="useToggleFixedColumn(gridRef, 'date', 'left')"
          size="mini"
          >设置date列固定</vxe-button
        >
        <vxe-button
          @click="useToggleFixedColumn(gridRef, 'address', 'right')"
          size="mini"
          >设置address列固定</vxe-button
        >
      </div>
      <div style="display: flex; justify-content: flex-start">
        <vxe-button type="info" @click="updateColumnDate" size="mini"
          >更新列与数据</vxe-button
        >
      </div>
      <div style="display: flex; justify-content: flex-start">
        <vxe-button @click="exportEvent" size="mini">直接导出</vxe-button>
        <vxe-button @click="importEvent" size="mini">直接导入</vxe-button>
        <vxe-button @click="printEvent">直接打印</vxe-button>
        <vxe-button @click="printHighEvent">高级打印</vxe-button>
      </div>
    </el-space>
    <vxe-grid ref="gridRef" v-bind="gridOptions" size="mini">
      <template #dragBtn>
        <span class="drag-btn">
          <i class="vxe-icon-drag-handle"></i>
        </span>
      </template>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <vxe-button @click="saveRowEvent(row)" size="mini">保存</vxe-button>
          <vxe-button @click="cancelRowEvent(row)" size="mini">取消</vxe-button>
        </template>
        <template v-else>
          <vxe-button @click="editRowEvent(row)" size="mini">编辑</vxe-button>
        </template>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick, onUnmounted } from "vue";
import { VxeUI } from "vxe-pc-ui";
import XEUtils from "xe-utils";
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
} from "@/components/LaTable/hooks/useMethods";
// import {
//   useHeaderCellStyle,
//   useRowStyle,
//   useCellStyle,
// } from "@/components/LaTable/hooks/useStyleConfig";
// import { useColumnConfig } from "@/components/LaTable/hooks/useColumnConfig";
import { useRowConfig } from "@/components/LaTable/hooks/useRowConfig";
import {
  useLoading,
  useLoadingConfig,
} from "@/components/LaTable/hooks/useLoadingConfig";
import "@/components/LaTable/utils/formatter";
import {
  columns,
  gridData,
  columns1,
  gridData1,
} from "@/components/LaTable/staticData";
import { useRadioConfig } from "@/components/LaTable/hooks/useRadioOrCheckedConfig";
import {
  registerExcel,
  registerPdf,
} from "@/plugins/VxeTablePlugins/exportTable";
registerExcel();
registerPdf();

import createSortTable from "@/components/LaTable/hooks/useSortable";

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

const gridRef = ref({} as VxeGridInstance);

// 表格配置项
let gridOptions = reactive<
  VxeGridProps<RowVO> & {
    menuConfig: VxeTablePropTypes.MenuConfig<RowVO>;
  }
>({
  border: true,
  ...useRowConfig(),
  ...useRadioConfig("name"),
  ...useLoadingConfig(),
  showHeader: true, // 显示表头
  showFooter: true, // 显示尾部
  footerMethod: (gridData) => useFooterMethod(gridData),
  // footerData: [
  //   // 多行表尾数据
  //   { name: "合计", num: "￥282" },
  //   { name: "平均", num: "2.88 元" },
  // ],
  // 动态样式
  // ...useHeaderCellStyle(({ column }) => {
  //   if (column.field === "name") {
  //     return {
  //       backgroundColor: "#f60",
  //       color: "#ffffff",
  //     };
  //   }
  // }),
  // ...useRowStyle(({ rowIndex }) => {
  //   const keys = [1, 2];
  //   const style = {
  //     backgroundColor: "red",
  //     color: "#ffffff",
  //   };
  //   if (keys.includes(rowIndex)) {
  //     return style;
  //   }
  // }),
  // ...useCellStyle(({ column, row }) => {
  //   {
  //     if (column.field === "sex") {
  //       if (row.sex >= "1") {
  //         return {
  //           backgroundColor: "#187",
  //         };
  //       } else if (row.age === 26) {
  //         return {
  //           backgroundColor: "#2db7f5",
  //         };
  //       }
  //     }
  //   }
  // }),
  // 列配置
  // ...useColumnConfig(),
  sortConfig: {
    // 服务端排序
    remote: true,
  },
  filterConfig: {
    // 服务端筛选
    remote: true,
  },
  // 右键菜单
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
    custom: true,
    // 左侧
    buttons: [
      { name: "新增", code: "add", status: "primary", size: "small" },
      { name: "删除", code: "del", status: "error" },
      { name: "保存", code: "save", status: "success" },
    ],
    // 右侧
    tools: [
      { name: "新增1", code: "add1", status: "primary" },
      { name: "删除1", code: "del1", status: "error" },
      { name: "保存1", code: "save1", status: "success" },
    ],
    // 导入 直接开启
    import: {
      icon: "vxe-icon-cloud-upload",
    },
    // 导出
    export: true,
    // 刷新 自定义图标
    refresh: {
      icon: "vxe-icon-refresh",
      iconLoading: "vxe-icon-refresh roll",
    },
  },
  // 配合 工具栏 import 使用
  importConfig: {},
  // 配合 工具栏 export 使用
  exportConfig: {
    // 默认选中类型
    // type: "xlsx",
    // 自定义类型
    // types: ['xlsx', 'csv', 'html', 'xml', 'txt']
    // 默认选中类型
    type: "pdf",
    // 自定义类型
    // types: ["pdf", "csv", "html", "xml", "txt"],
  },
  // 分页配置
  pagerConfig: {
    // 配合 工具栏 refresh 使用
    enabled: true,
    pageSize: 15,
  },
  //   // 配合 工具栏 refresh 使用
  // proxyConfig: {
  //   props: {
  //     result: "result",
  //     total: "page.total",
  //   },
  //   ajax: {
  //     // 接收 Promise
  //     query: ({ page }) => {
  //       console.log("page:", page);
  //       // return fetchApi(page.currentPage, page.pageSize);
  //       return fetch(
  //         `https://api.vxetable.cn/demo/api/pub/page/list/${page.pageSize}/${page.currentPage}`,
  //       ).then((response) => response.json());
  //     },
  //   },
  // },
  // 表格上面表单
  formConfig: {
    items: [
      { field: "name", title: "名称", itemRender: { name: "VxeInput" } },
      { field: "email", title: "邮件", itemRender: { name: "VxeInput" } },
      { field: "nickname", title: "昵称", itemRender: { name: "VxeInput" } },
      {
        itemRender: {
          name: "VxeButtonGroup",
          options: [
            { type: "submit", content: "搜索", status: "primary" },
            { type: "reset", content: "重置" },
          ],
        },
      },
    ],
  },
  // 开启树形结构
  treeConfig: {
    rowField: "id",
    childrenField: "children",
  },
  // 可编辑
  // 还原数据
  keepSource: true,
  editConfig: {
    trigger: "dblclick",
    mode: "row",
    showStatus: true,
    autoClear: false,
  },
  // 编辑行，单元格校验
  editRules: {
    age: [{ required: true, pattern: "^[0-9]{0,3}$", message: "格式不正确" }],
    sex: [
      { required: true, message: "性别必须填写" },
      { pattern: /^['男','女']{1}$/, message: "格式不正确" },
    ],
  },
  // 打印配置
  printConfig: {},
  columns: columns,
  data: gridData,
});

// // 模拟后台接口 - 刷新数据
// const fetchApi = (currentPage: number, pageSize: number) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const list = gridData1;
//       resolve({
//         page: {
//           total: list.length,
//         },
//         result: list.slice(
//           (currentPage - 1) * pageSize,
//           currentPage * pageSize,
//         ),
//       });
//     }, 100);
//   });
// };

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

const gridEvents: VxeGridListeners = {
  sortChange({ field, order }) {
    console.log("field", field, "order:", order);
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

// 手动编辑 --- start
const hasEditStatus = (row: RowVO) => {
  const $grid = gridRef.value;
  if ($grid) {
    return $grid.isEditByRow(row);
  }
};

const editRowEvent = (row: RowVO) => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.setEditRow(row);
  }
};

const saveRowEvent = (row: RowVO) => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.clearEdit().then(() => {
      gridOptions.loading = true;
      setTimeout(() => {
        gridOptions.loading = false;
        VxeUI.modal.message({
          content: `保存成功！name=${row.name}`,
          status: "success",
        });
      }, 300);
    });
  }
};

const cancelRowEvent = (row: RowVO) => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.clearEdit().then(() => {
      // 还原行数据
      $grid.revertData(row);
    });
  }
};
// 手动编辑 --- end

// 导出/导入 --- start
const exportEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    // $table.exportData({
    //   filename: "导出",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    // });
    $grid.exportData({
      filename: "Order details",
      sheetName: "Order details ( X02514645652 )",
      type: "pdf",
    });
  }
};
const importEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.importData();
  }
};
// 导出/导入 --- end

// 打印 --- start
// 打印顶部内容模板
const topHtml = `
<h1 class="title">出货单据</h1>
<div class="my-top">
  <div class="my-list-row">
    <div class="my-list-col">商品名称：vxe-table</div>
    <div class="my-list-col">发货单号：X2665847132654</div>
    <div class="my-list-col">发货日期：2020-09-20</div>
  </div>
  <div class="my-list-row">
    <div class="my-list-col">收货姓名：小徐</div>
    <div class="my-list-col">收货地址：火星第七区18号001</div>
    <div class="my-list-col">联系电话：10086</div>
  </div>
</div>
`;

// 打印底部内容模板
const bottomHtml = `
<div class="my-bottom">
  <div class="my-list-row">
    <div class="my-list-col"></div>
    <div class="my-list-col">创建人：小徐</div>
    <div class="my-list-col">创建日期：2020-09-20</div>
  </div>
</div>
`;

const printStyle = `
.title {
  text-align: center;
}
.my-list-row {
  display: inline-block;
  width: 100%;
}
.my-list-col {
  float: left;
  width: 33.33%;
  height: 28px;
  line-height: 28px;
}
.my-top,
.my-bottom {
  font-size: 12px;
}
.my-top {
  margin-bottom: 5px;
}
.my-bottom {
  margin-top: 30px;
  text-align: right;
}
`;
const printEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.print({
      sheetName: "自定义打印样式",
      style: printStyle,
      beforePrintMethod({ html }) {
        return topHtml + html + bottomHtml;
      },
    });
  }
};
// 高级打印
const printHighEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.openPrint();
  }
};
// 打印 --- end

// 拖拽 --- start
let sortable: any;
const initSortTable = () => {
  const $grid = gridRef.value;
  const el = $grid.$el.querySelector(
    ".body--wrapper>.vxe-table--body tbody",
  ) as HTMLElement;
  sortable = createSortTable(el);
  console.log("sortable---", sortable);
};

// 拖拽 --- end
let initTime: any;
const updateColumnDate = () => {
  useLoading(gridOptions, true);
  initTime = setTimeout(() => {
    useLoading(gridOptions, false);
    gridOptions.columns = columns1;
    gridOptions.data = gridData1;
  }, 2000);
};

onMounted(() => {
  useLoading(gridOptions, true);
  nextTick(() => {
    initTime = setTimeout(() => {
      useLoading(gridOptions, false);
      initSortTable();
    }, 2000);
  });
});

onUnmounted(() => {
  clearTimeout(initTime);
  if (sortable) {
    sortable.destroy();
  }
});
</script>

<style scoped scss>
.drag-btn {
  cursor: move;
  font-size: 12px;
}
.vxe-body--row.sortable-ghost,
.vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>
