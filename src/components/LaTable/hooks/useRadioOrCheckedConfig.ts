// 单选/复选
export const useRadioConfig = (
  labelField: string,
  highlight: boolean = true
) => {
  return {
    radioConfig: {
      labelField,
      highlight
    }
  };
};
