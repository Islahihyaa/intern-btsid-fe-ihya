<template>
  <div
    class="py-2 px-4 mb-8 shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
  >
    <div class="flex justify-between items-center">
      <div class="text-lg text-white">
        {{ boardComputed ? boardComputed.board.boardTitle : "" }}
      </div>
      <div>
        <button
          @click="() => TogglePopup('buttonTriggers')"
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Share
        </button>
      </div>
    </div>
  </div>
  <ShareBoardCard
    v-if="cardTriggers.buttonTriggers"
    :TogglePopup="() => TogglePopup('buttonTriggers')"
  />
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
      <p class="ml-2 text-sm text-white">(shared) Add List</p>
    </div>
  </button>

  <div class="m-4 overflow-x-auto h-screen">
    <div class="flex items-baseline">
      <div
        v-for="list in listComputed"
        :key="list.listId"
        class="flex-shrink-0 w-72 mr-3 my-6 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
      >
        <div class="mb-4 text-lg">
          <label for="title">{{ list.listTitle }}</label>
        </div>

        <div>
          <!-- <draggable v-model="$state.lists" group="tasks" @end="onEnd">
            <div
              v-for="list in $state.lists"
              :key="list.listId"
              draggable="true"
              class="w-full mt-1 py-2 px-4 text-lg rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
            >
              <p>{{ list.listTitle }}</p>
            </div>
          </draggable> -->
        </div>

        <div
          v-for="task in list.tasks"
          :key="task.taskId"
          draggable="true"
          class="flex-shrink-0 w-full mt-1 py-2 px-4 text-lg rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
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
            <div v-if="errorMessageTask">
              <p
                v-for="(msg, index) in errorMessageTask"
                :key="index"
                class="text-red-500 text-xs px-2 py-1 flex justify-center mb-3"
              >
                {{ msg }}
              </p>
            </div>
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
        class="flex-shrink-0 w-64 mx-4 my-2 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
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
              <div v-if="errorMessageList">
                <p
                  v-for="(msg, index) in errorMessageList"
                  :key="index"
                  class="text-red-500 text-xs px-2 py-1 flex justify-center mb-3"
                >
                  {{ msg }}
                </p>
              </div>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-ghost" @click="cancelForm">Cancel</button>
              <button type="submit" class="btn btn-primary">Create List</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ShareBoardCard from "@/components/ShareBoardCard.vue";
import { createList, getList } from "@/services/listService";
import { createTask } from "@/services/taskService";
import { useBoardStore } from "@/store/board";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";

const errorMessageList = ref([]);
const errorMessageTask = ref([]);
const listTitle = ref("");
const isFormVisible = ref(false);
const selectedListId = ref(null);
const taskTitle = ref("");
const buttonTaskHidden = ref(true);
const route = useRoute();

const emit = defineEmits(["cancel"]);

const props = defineProps({
  showMenu: {
    type: Boolean,
    required: true,
  },
});

const cardTriggers = ref({
  buttonTriggers: false,
});

const TogglePopup = (trigger) => {
  cardTriggers.value[trigger] = !cardTriggers.value[trigger];
};

const boardStore = useBoardStore();
const { $state, setBoardAndSlug } = boardStore;

const boardComputed = computed(() => {
  return boardStore.$state.sharedBoards.find(
    (item) => item.board.boardSlug === route.params.boardSlug
  );
});

const listComputed = computed(() => $state.lists);

const handleList = async () => {
  const boardIdData = boardComputed.value.board.boardId;
  console.log("board id data", boardComputed.value.board.boardId);

  try {
    const listData = {
      listTitle: listTitle.value,
      boardId: boardIdData,
    };
    const accessToken = localStorage.getItem("token");

    const response = await createList(listData, accessToken);
    boardStore.addList(response);
    console.log("response on card", response);
    isFormVisible.value = false;
    listTitle.value = "";
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessageList.value = [formatErrorMessage(error.error.message)];
      console.log("Error create list", error.error.message);
    } else {
      console.log("Unknown error occurred while creating list.", error);
    }
  }
};

const getListData = async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const boardSlug = route.params.boardSlug;

    if (!boardSlug) return;

    const response = await getList(accessToken, boardSlug);
    const lists = response.data;
    $state.lists = lists;

    console.log("get lists data", response.data);
  } catch (error) {
    console.error("Error fetching boards:", error);
  }
};

watch(route, (newRoute) => {
  const boardSlug = newRoute.params.boardSlug;
  if (boardSlug) {
    setBoardAndSlug($state.boardSelected, boardSlug);
    getListData();
  }
});

onMounted(() => {
  const boardSlug = route.params.boardSlug;
  if (boardSlug) {
    setBoardAndSlug($state.boardSelected, boardSlug);
    getListData();
  }
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

    const accessToken = localStorage.getItem("token");

    const response = await createTask(taskData, accessToken);
    const createdTask = response.data;

    boardStore.addTask({ listId, task: createdTask });

    taskTitle.value = "";
  } catch (error) {
    if (error.error && error.error.message) {
      errorMessageTask.value = [formatErrorMessage(error.error.message)];
      console.log("error create task", error.error.message);
    } else {
      console.log("Unknown error", error);
    }
  }
};

// const onEnd = async (event) => {
//   try {
//     const accessToken = localStorage.getItem("token");
//     await updateTaskOrder(event.moved, accessToken);
//     getListData(); // Refresh lists after updating task order
//   } catch (error) {
//     console.error("Error updating task order:", error);
//   }
// };

const formatErrorMessage = (message) => {
  if (message.includes("Validation error: list")) {
    return "List name cannot be blank";
  } else if (message.includes("Validation error: task")) {
    return "Task name cannot be blank";
  }
  return "Create list failed: " + message;
};
</script>
