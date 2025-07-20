export const useBaseStore = defineStore("base", () => {
  const snackbar = ref({
    open: false,
    text: "",
    color: "",
    timeout: 5000,
  });

  const openSnackbar = ({
    text,
    color,
    timeout = 5000,
  }: {
    text: string;
    color: string;
    timeout?: number;
  }) => {
    snackbar.value = {
      open: true,
      text,
      color,
      timeout,
    };
  };

  const closeSnackbar = () => {
    snackbar.value.open = false;
  };

  return { snackbar, closeSnackbar, openSnackbar };
});
