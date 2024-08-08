<template>
  <ShareBoardHeader :boardComputed="boardComputed" />

  <ButtonAddList :isFormVisible="isFormVisible" @show-form="showForm" />

  <div class="m-4 overflow-x-auto h-screen">
    <div class="flex items-baseline">
      <div
        v-for="list in listComputed"
        :key="list.listId"
        :data-list-id="list.listId"
        class="flex-shrink-0 w-72 mr-3 my-6 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
      >
        <div class="mb-4 text-lg">
          <label for="title">{{ list.listTitle }}</label>
        </div>

        <draggable
          v-model="list.tasks"
          item-key="taskId"
          group="tasks"
          @end="onEnd"
        >
          <template #item="{ element }">
            <div
              :data-task-id="element.taskId"
              class="flex-shrink-0 w-full mt-1 py-2 px-4 text-lg rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
            >
              <p>{{ element.taskTitle }}</p>
            </div>
          </template>
        </draggable>

        <AddTaskForm :list="list" @addedTask="handleAddedTask" />
      </div>

      <AddListForm
        :isFormVisible="isFormVisible"
        @cancel-form="cancelForm"
        :boardComputed="boardIdData"
        @addedList="handleAddedList"
      />
    </div>
  </div>
</template>

<script setup>
import ShareBoardHeader from "./layout/ShareBoardHeader.vue";
import { getList } from "@/services/listService";
import { updateTaskOrder } from "@/services/taskService";
import { useBoardStore } from "@/store/board";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import draggable from "vuedraggable";
import socket from "@/socket";
import ButtonAddList from "./ui/ButtonAddList.vue";
import AddTaskForm from "./modals/AddTaskForm.vue";
import AddListForm from "./modals/AddListForm.vue";
import useFormVisibility from "./composable/useFormVisibility";
import { handleCreatedList, handleCreatedTask, handleUpdatedTask } from "./composable/useSocketListener";

const errorMessageTask = ref([]);

const route = useRoute();
const router = useRouter()
const boardStore = useBoardStore();
const { $state, setBoardSelected } = boardStore;

const { isFormVisible: isFormVisible, showForm, cancelForm } = useFormVisibility();

const boardComputed = computed(() => {
  return boardStore.$state.sharedBoards.find(
    (item) => item.board.boardId === route.params.boardId
  );
});

const boardIdData = computed(() => {
  const board = boardComputed.value;
  return board ? board.board : null;
});

const listComputed = computed(() => $state.lists);

const handleAddedList = (value) => {
  socket.emit("createList", value);
  getListData();
};

const handleAddedTask = (value) => {
  socket.emit("createTask", value);
};

const getListData = async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const boardId = route.params.boardId;

    const response = await getList(accessToken, boardId);
    setupSocketListener(boardId);

    $state.lists = response.data;
  } catch (error) {
    router.push("/board")
    console.error("Error fetching boards:", error);
  }
};

const setupSocketListener = (boardId) => {
  socket.emit("join-board", boardId);
  socket.on("createdList", (response) => handleCreatedList(response, $state.lists));
  socket.on("createdTask", (response) => handleCreatedTask(response, $state.lists));
  socket.on("updatedTask", (response) => handleUpdatedTask(response, $state.lists));
};

const onEnd = async (event) => {
  try {
    const accessToken = localStorage.getItem("token");

    const taskElement = event.item;
    const taskId = taskElement.dataset.taskId;

    const targetListElement = event.to.closest("[data-list-id]");
    const listId = targetListElement ? targetListElement.dataset.listId : null;

    const oldListElement = event.from.closest("[data-list-id]");
    const oldListId = oldListElement ? oldListElement.dataset.listId : null;

    const response = await updateTaskOrder({ taskId, listId }, accessToken);
    const updatedTask = response.data;

    socket.emit("updateTask", { ...updatedTask, oldListId });

    getListData();
  } catch (error) {
    errorMessageTask.value = ["Error updating task order"];
  }
};

watch(route, (newRoute) => {
  const boardId = newRoute.params.boardId;
  if (boardId) {
    setBoardSelected(boardId);
    getListData();
  }
});

onMounted(() => {
  const boardId = route.params.boardId;
  if (boardId) {
    setBoardSelected(boardId);
    getListData();
  }
});
</script>
