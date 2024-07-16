<template>
  <div @click="toggleProfileCard" class="avatar">
    <span>{{ initials }}</span>
    <ProfileCard v-if="showProfile" :userName="props.userName" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { defineProps } from "vue";
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

<style>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: #002aff;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
  margin-left: 2px;
  cursor: pointer;
}
</style>
