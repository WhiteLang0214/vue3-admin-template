import { reactive } from "vue";
import type { VxeColumnPropTypes } from "vxe-table";

const dateFilterRender = reactive<VxeColumnPropTypes.FilterRender>({
  name: "VxeDatePicker",
});

const sexCellRender = reactive<VxeColumnPropTypes.CellRender>({
  name: "VxeSwitch",
  props: {
    openLabel: "男",
    closeLabel: "女",
  },
});

export const columns: any = [
  {
    title: "人员信息",
    titlePrefix: { content: "自定义前缀" },
    children: [
      {
        width: 60,
        slots: { default: "dragBtn" },
      },
      { type: "seq", width: 70 },
      // 表头分组
      {
        field: "name",
        title: "姓名",
        width: 200,
        treeNode: true,
      },
    ],
  },
  {
    field: "age",
    title: "年龄",
    sortable: true,
    editRender: { name: "VxeInput", props: { type: "integer" } },
  },
  {
    field: "sex",
    title: "性别",
    titlePrefix: { content: "筛选性别" },
    filterMultiple: false, // 开启筛选
    filters: [
      { label: "男", value: "男" },
      { label: "女", value: "女" }, // 默认筛选“女”
    ],
    // cellRender和editRender只能存在一个，否则有警告
    // cellRender: sexCellRender,
    editRender: {
      name: "VxeSelect",
      props: {
        options: [
          { label: "男", value: "男" },
          { label: "女", value: "女" },
        ],
      },
    },
  },
  {
    field: "role",
    title: "角色",
    titlePrefix: {
      content: "自定义前缀图标",
      icon: "vxe-icon-question-circle-fill",
    },
    align: "center",
    showOverflow: true,
  },
  {
    field: "num",
    title: "num",
    // footerFormatter({ itemValue }) {
    //   return `￥${itemValue}元`; // 格式化表尾内容
    // },
  },
  {
    field: "date",
    title: "Date",
    titleSuffix: { content: "自定义后缀" },
    formatter: ["formatDate", "yyyy-MM-dd HH:mm:ss"],
    filters: [{ data: "" }],
    filterRender: dateFilterRender,
  },
  {
    field: "rate",
    title: "Rate",
    titleSuffix: {
      content: "自定义后缀图标",
      icon: "vxe-icon-question-circle-fill",
    },
  },
  { field: "address", title: "Address", showOverflow: "tooltip" }, // 内容溢出时显示为省略号并用 tooltip 显示
  {
    type: "html",
    field: "content",
    title: "Content",
    width: 200,
    fixed: "right",
  },
  { title: "操作", fixed: "right", width: 200, slots: { default: "action" } },
];

export const gridData: any = [
  {
    id: 24200,
    name: "Test1",
    role: "前端省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～省略号～～～",
    date: "2022-10-24T08:14:18.000Z",
    rate: 5,
    address: "address1",
    content: "xxxxx1换行换行11111111111",
    sex: "男",
    age: 18,
    children: [
      {
        id: 24300,
        name: "Test3",
        type: "avi",
        size: 1024,
        date: "2020-03-01",
        children: [
          {
            id: 20045,
            name: "Test4",
            type: "html",
            size: 600,
            date: "2021-04-01",
          },
          {
            id: 10053,
            name: "Test5",
            type: "avi",
            size: 0,
            date: "2021-04-01",
            children: [
              {
                id: 24330,
                name: "Test6",
                type: "txt",
                size: 25,
                date: "2021-10-01",
              },
              {
                id: 21011,
                name: "Test7",
                type: "pdf",
                size: 512,
                date: "2020-01-01",
              },
              {
                id: 22200,
                name: "Test8",
                type: "js",
                size: 1024,
                date: "2021-06-01",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 24201,
    name: "Test2",
    role: "后端",
    date: "2020-09-04T06:08:25.000Z",
    rate: 2,
    address: "address2\ntooltip文本换行\n换行xx",
    content: "xxxxx1换行换行2",
    sex: "男",
    age: 28,
    children: [
      {
        id: 23666,
        name: "Test9",
        type: "xlsx",
        size: 2048,
        date: "2020-11-01",
        children: [
          {
            id: 23677,
            name: "Test10",
            type: "js",
            size: 1024,
            date: "2021-06-01",
            children: [
              {
                id: 23671,
                name: "Test11",
                type: "js",
                size: 1024,
                date: "2021-06-01",
              },
              {
                id: 23672,
                name: "Test12",
                type: "js",
                size: 1024,
                date: "2021-06-01",
              },
            ],
          },
          {
            id: 23688,
            name: "Test13",
            type: "js",
            size: 1024,
            date: "2021-06-01",
            children: [
              {
                id: 23681,
                name: "Test14",
                type: "js",
                size: 1024,
                date: "2021-06-01",
              },
              {
                id: 23682,
                name: "Test15",
                type: "js",
                size: 1024,
                date: "2021-06-01",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 24202,
    name: "Test3",
    role: "前端",
    date: "2020-11-14T07:14:41.000Z",
    rate: 0,
    address: "address3\ntooltip文本换行\n换行xx",
    content: "xxxxx1换行换行3333",
    sex: "男",
    age: 20,
  },
  {
    id: 24203,
    name: "Test4",
    role: "设计师",
    date: "2020-02-23",
    rate: 1,
    address: "address4",
    content: "xxxxx1<br>换行换行4",
    sex: "女",
    age: 32,
  },
  {
    id: 24204,
    name: "Test5",
    role: "前端",
    date: "2020-01-20",
    rate: 3,
    address: "address5\ntooltip文本换行\n换行xx",
    content: "xxxxx1<br>换行换行55",
    sex: "男",
    age: 40,
  },
];

export const columns1: any = [
  { type: "seq", width: 70 },
  { field: "name", title: "Name" },
  { field: "sex", title: "Sex" },
  { field: "age", title: "Age" },
  { field: "address", title: "Address", showOverflow: "tooltip" },
];

export const gridData1: any = [
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "男",
    age: 28,
    address: "test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "女",
    age: 22,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "男",
    age: 32,
    address: "Shanghai",
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "女",
    age: 24,
    address: "Shanghai",
  },
];

import { type VxeGridProps } from "vxe-table";
export const gridOptions2 = reactive({
  border: true,
  rowConfig: {
    useKey: true,
  },
  scrollY: {
    enabled: false,
  },
  treeConfig: {
    childrenField: "children",
  },
  columns: [
    { width: 60, slots: { default: "dragBtn" } },
    { field: "name", title: "Name", treeNode: true },
    { field: "size", title: "Size" },
    { field: "type", title: "Type" },
    { field: "date", title: "Date" },
  ],
  data: [
    {
      id: 1000,
      name: "test abc1",
      type: "mp3",
      size: 1024,
      date: "2020-08-01",
    },
    {
      id: 1005,
      name: "Test2",
      type: "mp4",
      size: null,
      date: "2021-04-01",
      children: [
        {
          id: 24300,
          name: "Test3",
          type: "avi",
          size: 1024,
          date: "2020-03-01",
        },
        {
          id: 20045,
          name: "test abc4",
          type: "html",
          size: 600,
          date: "2021-04-01",
        },
        {
          id: 10053,
          name: "test abc96",
          type: "avi",
          size: null,
          date: "2021-04-01",
          children: [
            {
              id: 24330,
              name: "test abc5",
              type: "txt",
              size: 25,
              date: "2021-10-01",
            },
            {
              id: 21011,
              name: "Test6",
              type: "pdf",
              size: 512,
              date: "2020-01-01",
            },
            {
              id: 22200,
              name: "Test7",
              type: "js",
              size: 1024,
              date: "2021-06-01",
            },
          ],
        },
      ],
    },
    { id: 23666, name: "Test8", type: "xlsx", size: 2048, date: "2020-11-01" },
    {
      id: 24555,
      name: "test abc9",
      type: "avi",
      size: 224,
      date: "2020-10-01",
    },
  ],
} as VxeGridProps);
