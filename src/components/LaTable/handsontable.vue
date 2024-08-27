<script setup lang="ts">
import { onMounted, ref } from "vue";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import "handsontable/languages/zh-CN"; //汉语包
// import { ColumnSorting, DropdownMenu } from "handsontable/plugins";

// register Handsontable's modules
registerAllModules();

defineOptions({
  name: "EleTable",
});

const hotTableRef = ref();

const getHotInstance = () => {
  return hotTableRef.value?.hotInstance;
};

const hotSettings = {
  id: "my-test-hotTable", // 表格id
  className: "my-test-hotTable-classname", // 表格类名
  style: "height: 142px;overflow:hidden;border: 1px solid red", // 表格样式
  startRows: 5, // 默认5行
  startCols: 5, // 默认5列
  colHeaders: true, // 显示开启列标题
  headerClassName: "htCenter", // 列对其方式 htLeft htRight htCenter
  fixedColumnsLeft: 1, // 固定左边列数
  rowHeights: 55,
  autoWrapRow: true,
  autoWrapCol: true,
  lilcenseKeuy: "non-commercial-and-evaluation",
  filters: true, // 开启列筛选 所有列
  // dropdownMenu: true, // 开启列筛选界面 所有筛选项
  dropdownMenu: ["filter_by_condition", "filter_by_value", "filter_action_bar"], // 只开启筛选项
  beforeFilter: (conditionStack) => {
    // 去服务器获取过滤结果
    console.log("过滤数量 conditionStack:", conditionStack);

    return false;
  },
  // 开启排序
  // columnSorting: {
  //   headerAction: true,
  //   sortEmptyCells: false, // 对空单元格排序到末尾
  //   indicator: true // 启用在列名旁边的排序图标
  //   // // 设置初始排序
  //   // initialConfig: {
  //   //   column: 1, // 按第2列
  //   //   sortOrder: "desc" // 降序
  //   // }
  // },
  columnSorting: true,
};

const hotcolumn = [
  {
    id: 1,
    data: "title",
    title: "名称",
    columnSorting: {
      // 禁用名称列排序
      headerAction: false,
    },
  },
  {
    id: 2,
    data: "age",
    title: "年龄",
    readOnly: false,
  },
  {
    id: 3,
    data: "sex",
    title: "性别",
  },
];
const hotData = [
  {
    title: "王超",
    age: 34,
    sex: "男",
  },
  {
    title: "张三",
    age: 14,
    sex: "男",
  },
  {
    title: "李四",
    age: 15,
    sex: "男",
  },
  {
    title: "吴云",
    age: 26,
    sex: "女",
  },
];

const updateData = (data) => {
  getHotInstance().updateData(data);
};

const beforeColumnSort = async (column, order) => {
  // add your code here
  console.log("api", column, order);
  const columnSortPlugin = getHotInstance().getPlugin("columnSorting");
  columnSortPlugin.setSortConfig(order);

  let newData = JSON.parse(JSON.stringify(hotData));
  if (order[0] && order[0].sortOrder == "asc") {
    newData = newData.sort((a, b) => {
      return a.age - b.age;
    });
  }

  if (order[0] && order[0].sortOrder == "desc") {
    newData = newData.sort((a, b) => {
      return b.age - a.age;
    });
  }

  setTimeout(() => {
    updateData(newData);
  }, 1000);
  return false; // 阻止前端排序
};

const addHook = (hookName, hookFunction) => {
  getHotInstance().addHook(hookName, hookFunction);
};

onMounted(() => {
  addHook("beforeColumnSort", beforeColumnSort);
});
</script>
<template>
  <div>
    <hot-table
      ref="hotTableRef"
      :settings="hotSettings"
      :columns="hotcolumn"
      :data="hotData"
    >
    </hot-table>
  </div>
</template>
