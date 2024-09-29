import Sortable from "sortablejs";

// 拖拽
const createSortTable = (el, handle = ".drag-btn") => {
  let sortTableRef = null;
  const options = {
    handle: handle || ".drag-btn",
    animation: 150,
    sort: true,
    onMove: (evt: any) => {
      console.log("move", evt);
    },
    onEnd: (sortableEvent) => {
      console.log("onEnd:", sortableEvent);
      // tableData.value.splice(
      //   newIndex,
      //   0,
      //   tableData.value.splice(oldIndex, 1)[0]
      // );
      // var newArray = tableData.value.slice(0);
      // tableData.value = [];
      // nextTick(function () {
      //   tableData.value = newArray;
      // });
    },
  };
  if (!el) return;
  if (sortTableRef) return;

  sortTableRef = Sortable.create(el, options);
  // console.log("sortable:", sortTableRef.value);

  return sortTableRef;
};

export default createSortTable;
