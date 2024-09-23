import { reactive } from "vue";
import type { VxeColumnPropTypes } from "vxe-table";

const dateFilterRender = reactive<VxeColumnPropTypes.FilterRender>({
  name: "VxeDatePicker"
});

export const columns: any = [
  {
    title: "人员信息",
    titlePrefix: { content: "自定义前缀" },
    fixed: "left", // 固定列 左
    children: [
      { type: "seq", width: 70, fixed: "left" },
      // 表头分组
      { field: "name", title: "姓名", width: 200, fixed: "left" }
    ]
  },
  { field: "age", title: "年龄", width: 150, sortable: true },
  {
    field: "sex",
    title: "性别",
    width: 350,
    titlePrefix: { content: "筛选性别" },
    filterMultiple: false, // 开启筛选
    filters: [
      { label: "男", value: "男" },
      { label: "女", value: "女" } // 默认筛选“女”
    ]
  },
  {
    field: "role",
    title: "角色",
    titlePrefix: {
      content: "自定义前缀图标",
      icon: "vxe-icon-question-circle-fill"
    },
    width: 350
  },
  {
    field: "num",
    title: "num",
    width: 350,
    footerFormatter({ itemValue }) {
      return `￥${itemValue}元`; // 格式化表尾内容
    }
  },
  {
    field: "date",
    title: "Date",
    titleSuffix: { content: "自定义后缀" },
    width: 350,
    formatter: ["formatDate", "yyyy-MM-dd HH:mm:ss"],
    filters: [{ data: "" }],
    filterRender: dateFilterRender
  },
  {
    field: "rate",
    title: "Rate",
    titleSuffix: {
      content: "自定义后缀图标",
      icon: "vxe-icon-question-circle-fill"
    },
    width: 350
  },
  { field: "address", title: "Address", width: 350, showOverflow: "tooltip" }, // 内容溢出时显示为省略号并用 tooltip 显示
  {
    type: "html",
    field: "content",
    title: "Content",
    width: 200,
    fixed: "right"
  }
];

export const gridData: any = [
  {
    name: "Test1",
    role: "前端",
    date: "2022-10-24T08:14:18.000Z",
    rate: 5,
    address: "address1",
    content: "xxxxx1<br>换行换行11111111111",
    sex: "男",
    age: 18
  },
  {
    name: "Test2",
    role: "后端",
    date: "2020-09-04T06:08:25.000Z",
    rate: 2,
    address: "address2\ntooltip文本换行\n换行xx",
    content: "xxxxx1<br>换行换行2",
    sex: "男",
    age: 28
  },
  {
    name: "Test3",
    role: "前端",
    date: "2020-11-14T07:14:41.000Z",
    rate: 0,
    address: "address3\ntooltip文本换行\n换行xx",
    content: "xxxxx1<br>换行换行<br>3333",
    sex: "男",
    age: 20
  },
  {
    name: "Test4",
    role: "设计师",
    date: "2020-02-23",
    rate: 1,
    address: "address4",
    content: "xxxxx1<br>换行换行4",
    sex: "女",
    age: 32
  },
  {
    name: "Test5",
    role: "前端",
    date: "2020-01-20",
    rate: 3,
    address: "address5\ntooltip文本换行\n换行xx",
    content: "xxxxx1<br>换行换行55",
    sex: "男",
    age: 40
  }
];

export const columns1: any = [
  { type: "seq", width: 70 },
  { field: "name", title: "Name" },
  { field: "sex", title: "Sex" },
  { field: "age", title: "Age" },
  { field: "address", title: "Address", showOverflow: true }
];

export const gridData1: any = [
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "男",
    age: 28,
    address: "test abc"
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "女",
    age: 22,
    address: "Guangzhou"
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "男",
    age: 32,
    address: "Shanghai"
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "女",
    age: 24,
    address: "Shanghai"
  }
];
