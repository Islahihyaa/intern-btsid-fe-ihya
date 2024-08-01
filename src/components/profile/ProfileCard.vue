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
