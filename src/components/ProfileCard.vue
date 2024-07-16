<template>
  <div class="profile-card">
    <div class="flex items-center justify-between">
      <p>{{ userName }}</p>
      <button class="btn btn-sm btn-circle btn-ghost">✕</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});
</script>

<style>
.profile-card {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(62, 67, 70);
  border: 1px solid #4d4d4d;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 223px;
  max-height: 68px;
}
</style>
