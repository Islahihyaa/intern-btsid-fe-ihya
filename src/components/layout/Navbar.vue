<template>
  <div class="navbar bg-base-300 border-b border-slate-600">
    <div class="flex-1 items-center">
      <a class="btn btn-ghost text-xl">
        <router-link to="/board"> Trello App </router-link>
      </a>
      <ButtonBoard @click="() => TogglePopup('buttonTriggers')"
        >Create</ButtonBoard
      >
      <CreateBoardForm
        v-if="cardTriggers.buttonTriggers"
        :TogglePopup="() => TogglePopup('buttonTriggers')"
      />
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <ButtonCancel tabindex="0" role="button">{{ userName }}</ButtonCancel>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a @click="handleLogout">Logout</a>
            <div v-if="errorMessage">
              <p
                class="text-red-500 text-xs px-2 py-1 flex justify-center mb-3"
              >
                {{ errorMessage }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CreateBoardForm from "../modals/CreateBoardForm.vue";
import { logout } from "@/services/authService";
import socket from "@/socket";
import ButtonBoard from "@/components/ui/ButtonBoard.vue";
import ButtonCancel from "../ui/ButtonCancel.vue";

const userName = ref("");
const errorMessage = ref("");

const cardTriggers = ref({
  buttonTriggers: false,
});
const router = useRouter();

const getUserNameFromLocalStorage = () => {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const parsedUserData = JSON.parse(storedUserData);
    userName.value = parsedUserData.name;
  }
};

onMounted(() => {
  getUserNameFromLocalStorage();
});

const TogglePopup = (trigger) => {
  cardTriggers.value[trigger] = !cardTriggers.value[trigger];
};

const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem("token");

    await logout(accessToken);

    socket.disconnect();

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    router.push("/login");
  } catch (error) {
    errorMessage.value = ["Error logout"];
  }
};
</script>
