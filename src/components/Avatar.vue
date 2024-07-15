<template>
  <div class="avatar">
    <span>{{ initials }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});

const initials = computed(() => {
  const nameParts = props.userName.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");
  return initials.toUpperCase();
});
</script>

<style>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
