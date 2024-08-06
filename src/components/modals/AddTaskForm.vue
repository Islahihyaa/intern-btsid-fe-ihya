<template>
  <form @submit.prevent="handleCreateTask(list.listId)">
    <div v-if="selectedListId === list.listId">
      <Input
        type="text"
        placeholder="Enter task..."
        v-model="taskTitle"
        class="my-4"
      />
      <div v-if="errorMessages">
        <p
          v-for="(msg, index) in errorMessages"
          :key="index"
          class="text-red-500 text-xs px-2 py-1 flex justify-center mb-3"
        >
          {{ msg }}
        </p>
      </div>
    </div>
    <div class="flex items-center">
      <ButtonCancel v-if="selectedListId === list.listId" type="submit">
        Add Task
      </ButtonCancel>
      <ButtonCancel v-if="selectedListId === list.listId" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </ButtonCancel>
    </div>
    <ButtonCancel
      v-if="selectedListId !== list.listId"
      @click="ButtonTask(list.listId)"
      class="w-full"
    >
      Add Task
    </ButtonCancel>
  </form>
</template>

<script setup>
import { createTask } from "@/services/taskService";
import Joi from "joi";
import { ref } from "vue";
import Input from "../ui/Input.vue";
import { useBoardStore } from "@/store/board";
import ButtonCancel from "../ui/ButtonCancel.vue";

const props = defineProps({
  list: {
    type: Object,
    required: true,
  },
  // selectedListId: {
  //   type: String,
  //   required: true,
  // },
});

const taskTitle = ref("");
const errorMessages = ref([]);
const selectedListId = ref(null);
const buttonTaskHidden = ref(true);
const boardStore = useBoardStore();

const handleCreateTask = async (listId) => {
  const validationData = {
    taskTitle: taskTitle.value,
  };

  const schema = Joi.object({
    taskTitle: Joi.string().required().messages({
      "string.empty": "Task title is not allowed to be empty",
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
    const taskData = {
      taskTitle: taskTitle.value,
      listId: listId,
    };

    const accessToken = localStorage.getItem("token");

    const response = await createTask(taskData, accessToken);
    const createdTask = response.data;

    boardStore.addTask({ listId, task: createdTask });
    taskTitle.value = "";
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessages.value = [formatErrorMessage(error.error.message)];
    } else {
      errorMessages.value = ["Unknown error"];
    }
  }
};

const formatErrorMessage = (message) => {
  if (message.includes("Validation error: list")) {
    return "List name cannot be blank";
  } else if (message.includes("Validation error: task")) {
    return "Task name cannot be blank";
  }
  return "Create list failed: " + message;
};

const ButtonTask = (listId) => {
  if (selectedListId.value === listId) {
    selectedListId.value = null;
    buttonTaskHidden.value = true;
  } else {
    selectedListId.value = listId;
    buttonTaskHidden.value = false;
  }
};

const close = () => {
  taskTitle.value = "";
  selectedListId.value = null;
};
</script>
