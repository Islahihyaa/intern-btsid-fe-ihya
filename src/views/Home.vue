<template>
  <div
    class="main-container h-screen flex flex-col overflow-y-hidden"
    data-theme="dark"
  >
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <div class="flex-1 p-4 overflow-x-auto">
        <Menu v-if="isHomeMenu" />
        <router-view v-else></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Menu from "@/views/Menu.vue";
import { defineEmits } from "vue";
import { useBoardStore } from "@/store/board";
import { computed } from "vue";
import { useRoute } from "vue-router";

const boardStore = useBoardStore();
defineEmits(["cancel"]);

const props = defineProps({
  TogglePopup: Function,
});

const route = useRoute();

const isHomeMenu = computed(() => route.name === "Home");
</script>
