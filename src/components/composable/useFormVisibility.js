import { ref } from "vue";

export default function useFormVisibility() {
  const isFormVisible = ref(false);
  const errorMessages = ref([]);

  const showForm = () => {
    isFormVisible.value = true;
  };

  const cancelForm = () => {
    isFormVisible.value = false;
    errorMessages.value = [];
  };

  return { isFormVisible, showForm, cancelForm };
}
