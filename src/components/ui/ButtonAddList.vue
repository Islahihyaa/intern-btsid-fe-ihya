<template>
  <button
    v-if="!isFormVisible"
    @click="$emit('showForm')"
    class="w-64 py-3 px-4 rounded-lg shadow-md bg-white bg-opacity-25 hover:bg-opacity-15"
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
      <p class="ml-2 text-md text-white">Add List</p>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  isFormVisible: Boolean,
});

const emit = defineEmits(["showForm"]);
</script>
