<template>
  <div @click="toggleProfileCard" class="avatar mr-4">
    <span class="text-center">{{ initials }}</span>
    <ProfileCard v-if="showProfile" :userName="props.userName" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {  } from "vue";
import ProfileCard from "./ProfileCard.vue";

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});

const initials = computed(() => {
  const nameParts = props.userName.split(" ");
  const firstTwoParts = nameParts.slice(0, 2);
  const initials = firstTwoParts.map((part) => part.charAt(0)).join("");
  return initials.toUpperCase();
});

const showProfile = ref(false);

const toggleProfileCard = () => {
  showProfile.value = !showProfile.value;
};
</script>
