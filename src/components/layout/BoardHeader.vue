<template>
  <div
    class="py-2 px-4 mb-8 shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
  >
    <div class="flex justify-between items-center">
      <div class="text-lg text-white">
        {{ boardComputed ? boardComputed.boardTitle : "" }}
      </div>
      <div class="flex items-center">
        <ButtonBoard @click="() => TogglePopup('buttonTriggers')"
          >Share</ButtonBoard
        >
      </div>
    </div>
  </div>
  <ShareBoardCard
    v-if="cardTriggers.buttonTriggers"
    :TogglePopup="() => TogglePopup('buttonTriggers')"
  />
</template>

<script setup>
import ButtonBoard from "../ui/ButtonBoard.vue";
import ShareBoardCard from "../modals/ShareBoardCard.vue";

import { ref } from "vue";

const props = defineProps({
  boardComputed: Object,
});

const cardTriggers = ref({
  buttonTriggers: false,
});

const TogglePopup = (trigger) => {
  cardTriggers.value[trigger] = !cardTriggers.value[trigger];
};
</script>
