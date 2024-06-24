<template>
  <div class="main-container h-screen overflow-hidden" data-theme="dark">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <div class="flex-1 p-4">
        <button
          v-if="!hidden"
          @click="() => TogglePopup('buttonTriggers')"
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
        <ListCardVue
          v-if="cardTriggers.buttonTriggers"
          :TogglePopup="() => TogglePopup('buttonTriggers')"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import ListCardVue from "@/components/ListCard.vue";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Sidebar,
    ListCardVue,
  },
  setup() {
    const cardTriggers = ref({
      buttonTriggers: false,
    });

    const hidden = ref(false);

    const TogglePopup = (trigger) => {
      cardTriggers.value[trigger] = !cardTriggers.value[trigger];
      if (cardTriggers.value[trigger]) {
        hidden.value = true;
      }
    };

    const handleCancel = () => {
      hidden.value = false
    }

    return {
      cardTriggers,
      hidden,
      TogglePopup,
      handleCancel
    };
  },
};
</script>

<style></style>
