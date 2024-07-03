<template>
  <div class="navbar bg-base-300 border-b-2 border-slate-600">
    <div class="flex-1 items-center">
      <a class="btn btn-ghost text-2xl">
        <router-link to="/board"> Trello App </router-link>
      </a>
      <button
        @click="() => TogglePopup('buttonTriggers')"
        class="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create
      </button>
      <BoardCard
        v-if="cardTriggers.buttonTriggers"
        :TogglePopup="() => TogglePopup('buttonTriggers')"
      />
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <p>{{ userName }}</p>
        </div>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li><a @click="handleLogout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BoardCard from "@/components/BoardCard.vue";
import { logout } from "@/services/authService";

const userName = ref("");

const cardTriggers = ref({
  buttonTriggers: false,
});

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

const router = useRouter();

const TogglePopup = (trigger) => {
  cardTriggers.value[trigger] = !cardTriggers.value[trigger];
};

const handleLogout = async () => {
  try {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("userData");

    await logout(accessToken);

    router.push("/login");
  } catch (error) {
    console.log("error logout", error);
  }
};
</script>
