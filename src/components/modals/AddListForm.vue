<template>
  <div
    v-if="isFormVisible"
    class="flex-shrink-0 w-64 mx-4 my-2 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
  >
    <div class="flex justify-start items-center">
      <form @submit.prevent="handleList">
        <div class="mb-4 text-lg">
          <label for="title">Title List</label>
          <Input
            type="text"
            placeholder="Enter list title ..."
            v-model="listTitle"
            class="my-4"
          />
          <AlertMessage
            v-for="(msg, index) in errorMessages"
            :key="index"
            :message="msg"
            type="error"
            class="text-xs font-medium my-4 px-2 py-1"
          />
        </div>
        <div class="card-actions justify-end">
          <ButtonCancel @click.prevent="$emit('cancelForm')"
            >Cancel</ButtonCancel
          >
          <ButtonSubmit class="font-medium text-base">Create List</ButtonSubmit>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Joi from "joi";
import AlertMessage from "../ui/AlertMessage.vue";
import Input from "../ui/Input.vue";
import ButtonCancel from "../ui/ButtonCancel.vue";
import ButtonSubmit from "../ui/ButtonSubmit.vue";
import { createList } from "@/services/listService";
import { handleError, resetForm, resetMessage } from "@/utils/errorUtils";
import { useBoardStore } from "@/store/board";

const props = defineProps({
  isFormVisible: {
    type: Boolean,
    required: true,
  },
  boardComputed: {
    type: Object,
    required: true,
  },
});

const listTitle = ref("");
const errorMessages = ref(null);
const boardStore = useBoardStore();

const emit = defineEmits(["addedList"]);

const handleList = async () => {
  resetMessage(null, errorMessages);

  const boardIdData = props.boardComputed;

  const validationData = {
    listTitle: listTitle.value,
  };

  const schema = Joi.object({
    listTitle: Joi.string().required().messages({
      "string.empty": "List title is not allowed to be empty",
    }),
  });

  const { error } = schema.validate(validationData, { abortEarly: false });

  if (error) {
    errorMessages.value = error.details.map((detail) =>
      detail.message.replace(/['"]/g, "")
    );
    return;
  }

  try {
    const listData = {
      listTitle: listTitle.value,
      boardId: boardIdData.boardId,
    };
    const accessToken = localStorage.getItem("token");
    const response = await createList(listData, accessToken);

    boardStore.addList(response);
    props.isFormVisible = false;
    listTitle.value = "";

    emit("addedList", response);
  } catch (error) {
    console.log(error);
    handleError(
      error,
      null,
      () => resetMessage(null, errorMessages),
      errorMessages,
      () => resetForm(listTitle)
    );
  }
};
</script>
