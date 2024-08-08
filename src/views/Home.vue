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
import { onMounted } from "vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Menu from "@/components/layout/Menu.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import socket from "@/socket";

defineEmits(["cancel"]);

const props = defineProps({
  TogglePopup: Function,
});

const route = useRoute();

const isHomeMenu = computed(() => route.name === "Home");

const setupSocket = () => {
  const token = localStorage.getItem("token");
  socket.auth.token = token;
  socket.connect();
};

onMounted(() => {
  setupSocket();
});
</script>
