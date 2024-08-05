<template>
  <BoardHeader :boardComputed="boardComputed" />

  <ButtonAddList :isFormVisible="isFormVisible" @show-form="showForm"
    >Add List</ButtonAddList
  >

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

        <AddTaskForm :list="list" />
      </div>

      <AddListForm
        :isFormVisible="isFormVisible"
        @cancel-form="cancelForm"
        :boardComputed="boardComputed"
      />
    </div>
  </div>
</template>

<script setup>
import { getList } from "@/services/listService";
import { updateTaskOrder } from "@/services/taskService";
import { useBoardStore } from "@/store/board";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";
import ButtonAddList from "./ui/ButtonAddList.vue";
import AddListForm from "./modals/AddListForm.vue";
import AddTaskForm from "./modals/AddTaskForm.vue";
import BoardHeader from "./layout/BoardHeader.vue";

const errorMessageTask = ref([]);
const isFormVisible = ref(false);
const listTitle = ref("");

const route = useRoute();
const boardStore = useBoardStore();
const { $state, setBoardAndSlug } = boardStore;

const boardComputed = computed(() => {
  return $state.boards.find((item) => item.boardId === route.params.boardId);
});

const listComputed = computed(() => $state.lists);

const getListData = async () => {
  try {
    const accessToken = localStorage.getItem("token");
    const boardId = route.params.boardId;

    const response = await getList(accessToken, boardId);
    const lists = response.data;
    $state.lists = lists;
  } catch (error) {
    if ((error.status = 404)) {
      console.error("Error fetching boards");
    } else {
      console.error("Error fetching boards:");
    }
  }
};

watch(route, (newRoute) => {
  const boardId = newRoute.params.boardId;
  if (boardId) {
    setBoardAndSlug($state.boardSelected, boardId);
    getListData();
  }
});

onMounted(() => {
  const boardId = route.params.boardId;
  if (boardId) {
    setBoardAndSlug($state.boardSelected, boardId);
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

const onEnd = async (event) => {
  try {
    const accessToken = localStorage.getItem("token");

    const taskElement = event.item;
    const taskId = taskElement.dataset.taskId;

    const targetListElement = event.to.closest("[data-list-id]");
    const listId = targetListElement ? targetListElement.dataset.listId : null;

    await updateTaskOrder({ taskId, listId }, accessToken);
    getListData();
  } catch (error) {
    errorMessageTask.value = ["Error updating task order"];
  }
};
</script>
