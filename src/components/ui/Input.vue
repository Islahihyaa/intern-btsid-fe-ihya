<template>
  <div class="mb-4 text-lg">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
