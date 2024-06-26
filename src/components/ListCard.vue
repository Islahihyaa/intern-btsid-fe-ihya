<template>
  <!-- <pre>

    {{ $state.lists }}
    
  </pre>
  {{  listComputed.lists }} -->
  <!-- {{  listTitles }} -->
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
  <div class="flex items-center">
    <!-- <div
      v-for="title in listTitles"
      :key="title"
      class="w-64 mr-3 my-2 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
    > -->
    <!-- {{  $state.lists  }} -->
    <div
      v-for="list in listComputed.lists"
      :key="list.listId"
      class="w-64 mr-3 my-6 py-2 px-4 rounded-lg shadow-md bg-black bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
    >
      <div class="mb-4 text-lg">
        <label for="title">{{ list.listTitle }}</label>
      </div>
      <div
        v-if="!taskHidden"
        class=""
      >
          <input type="text" class="w-full mr-3 my-6 py-2 px-4 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20" />
      </div>
      <button @click="handleTask" class="btn btn-ghost w-full">Add Task</button>
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
              placeholder="Title"
              v-model="listTitle"
              class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <!-- <div v-for="list in listComputed.lists" :key="list.listId">
            {{ list.listTitle }}
          </div> -->
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
import { useBoardStore } from "@/store/board";
import { ref, computed } from "vue";

const listTitle = ref("");
const isFormVisible = ref(false);
const taskHidden = ref(true);

const { $state } = useBoardStore();

const handleList = async () => {
  const boardIdData = $state.boardSelected;

  try {
    // const boardStore = useBoardStore();
    const listData = {
      listTitle: listTitle.value,
      boardId: boardIdData,
    };
    const accessToken = localStorage.getItem("token");

    await createList(listData, accessToken);

    // boardStore.addList(listData);

    isFormVisible.value = false;
    listTitle.value = "";
  } catch (error) {
    console.log("error create list", error);
  }
};

const listComputed = computed(() => {
  return $state.boards.find((item) => item.boardId === $state.boardSelected);
});

// const listTitles = computed(() => {
//   const lists = listComputed.value?.lists || [];
//   return lists.map((list) => list.listTitle);
// });

const showForm = () => {
  isFormVisible.value = true;
};

const cancelForm = () => {
  isFormVisible.value = false;
  listTitle.value = "";
};

const handleTask = () => {
  taskHidden.value = false
};

// export default {
//   name: "ListCard",
//   props: ["TogglePopup"],
//   data() {
//     return {
//       listTitle: "",
//     };
//   },
//   methods: {
//     async handleList() {
//       try {
//         const listData = {
//           listTitle: this.listTitle,
//           authorId: "f88d04c3-0b54-456f-944e-e48889535190",
//           boardId: "972d92e1-d362-4149-a6c6-4e494caf47be",
//         };
//         const accessToken = localStorage.getItem("token");
//         const response = await createList(listData, accessToken);
//         console.log("List Created", response);
//       } catch (error) {
//         if (error.error) {
//           console.log("error create list");
//         }
//       }
//     },
//     cancel() {
//       this.$emit("cancel"), this.TogglePopup();
//     },
//   },
// };
</script>
