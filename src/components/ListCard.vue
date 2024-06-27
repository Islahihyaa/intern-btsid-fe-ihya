<template>
  <button
    v-if="!isFormVisible"
    @click="showForm"
    class="w-64 py-2 px-4 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
  >
    <div class="flex justify-start items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p class="ml-2 text-sm text-white">Add List</p>
    </div>
  </button>

  <!-- Create List -->
  <div class="flex items-baseline">
    <div
      v-for="list in listComputed.lists"
      :key="list.listId"
      class="w-64 mr-3 my-6 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
    >
      <div class="mb-4 text-lg">
        <label for="title">{{ list.listTitle }}</label>
      </div>

      <div
        v-for="task in list.tasks"
        :key="task.taskId"
        class="w-full mt-1 py-2 px-4 text-lg rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
      >
        <p>{{ task.taskTitle }}</p>
      </div>

      <form @submit.prevent="formTask(list.listId)">
        <div v-if="selectedListId === list.listId">
          <input
            type="text"
            v-model="taskTitle"
            placeholder="Enter task..."
            class="w-full mb-4 mt-6 py-2 px-4 text-sm rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div class="flex items-center">
          <button
            v-if="selectedListId === list.listId"
            type="submit"
            class="btn btn-ghost"
          >
            Add Task
          </button>
          <button
            v-if="selectedListId === list.listId"
            @click="close"
            class="btn btn-ghost"
          >
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
          </button>
        </div>
        <button
          v-if="selectedListId !== list.listId"
          @click="ButtonTask(list.listId)"
          class="btn btn-ghost w-full"
        >
          Add Task
        </button>
      </form>
    </div>
    <div
      v-if="isFormVisible"
      class="w-64 mx-4 my-2 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
    >
      <div class="flex justify-start items-center">
        <form @submit.prevent="handleList">
          <div class="mb-4 text-lg">
            <label for="title">Title List</label>
            <input
              type="text"
              v-model="listTitle"
              class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div class="card-actions justify-end">
            <button class="btn btn-ghost" @click="cancelForm">Cancel</button>
            <button type="submit" class="btn btn-primary">Create List</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createList } from "@/services/listService";
import { createTask } from "@/services/taskService";
import { useBoardStore } from "@/store/board";
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";


const listTitle = ref("");
const isFormVisible = ref(false);
const selectedListId = ref(null);
const taskTitle = ref("");
const buttonTaskHidden = ref(true);

const emit = defineEmits(["cancel"]);
const props = defineProps({
  TogglePopup: Function,
});

const { $state } = useBoardStore();

const boardStore = useBoardStore();

const handleList = async () => {
  const boardIdData = boardStore.boardSelected;

  try {
    const listData = {
      listTitle: listTitle.value,
      boardId: boardIdData,
    };
    const accessToken = localStorage.getItem("token");

    await createList(listData, accessToken);

    isFormVisible.value = false;
    listTitle.value = "";
  } catch (error) {
    console.log("error create list", error);
  }
};

const listComputed = computed(() => {
  return $state.boards.find((item) => item.boardId === $state.boardSelected);
});

const taskComputed = computed(() => {
  return listComputed.lists.find(
    (item) => item.ListId === $state.selectedListId
  );
});

const showForm = () => {
  isFormVisible.value = true;
};

const cancelForm = () => {
  isFormVisible.value = false;
  listTitle.value = "";
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

const formTask = async (listId) => {
  try {
    const taskData = {
      taskTitle: taskTitle.value,
      listId: listId,
    };
    console.log("task data", taskData);
    console.log(" data", listId);

    const accessToken = localStorage.getItem("token");

    await createTask(taskData, accessToken);
    boardStore.addBoard(taskData);
    taskTitle.value = "";
  } catch (error) {
    console.log("error create task", error);
  }
};

//
const route = useRoute();
const board = ref(null)
const { id } = route.params;

// onBeforeMount(async() => {
//   board.value = boardStore.boards.find((item) => item.boardSelected === id)
// })

// console.log('asd', boardStore.boardSelected)
// console.log('asdasd', board.value)
// //

</script>
