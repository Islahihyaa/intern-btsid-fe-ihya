import { ref } from "vue";

export default function useFormVisibility() {
  const isFormVisible = ref(false);

  const showForm = () => {
    isFormVisible.value = true;
  };

  const cancelForm = () => {
    isFormVisible.value = false;
    listTitle.value = "";
  };

  return { isFormVisible, showForm, cancelForm };
}