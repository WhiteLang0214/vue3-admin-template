import type { VxeGridProps } from "vxe-table";
export const useLoadingConfig = (
  icon: string = "vxe-icon-indicator roll",
  text: string = "正在拼命加载中..."
) => {
  return {
    loadingConfig: {
      icon,
      text
    }
  };
};

export const useLoading = (gridOptions: VxeGridProps, val: boolean) => {
  gridOptions.loading = val;
};
