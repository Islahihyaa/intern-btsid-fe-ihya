<template>
  <div
    class="py-2 px-4 mb-8 shadow-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20"
  >
    <div class="flex justify-between items-center">
      <div class="text-lg text-white">
        {{ boardComputed ? boardComputed.board.boardTitle : "" }}
      </div>
      <div class="flex items-center">
        <div v-if="boardComputed">
          <Avatar :userName="boardComputed.board.author.userName" />
        </div>
        <div v-if="boardComputed && boardComputed.collaborators" class="mr-4">
          <ul class="flex items-center">
            <li
              v-for="collaborator in collaboratorsUserNames"
              :key="collaborator.userId"
            >
              <Avatar :userName="collaborator.userName" />
            </li>
          </ul>
        </div>
        <ButtonBoard @click="() => TogglePopup('buttonTriggers')"
          >Share</ButtonBoard>
      </div>
    </div>
  </div>
  <ShareBoardCard
    v-if="cardTriggers.buttonTriggers"
    :TogglePopup="() => TogglePopup('buttonTriggers')"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import Avatar from "../profile/Avatar.vue";
import ButtonBoard from "../ui/ButtonBoard.vue";
import ShareBoardCard from "../modals/ShareBoardCard.vue";

const props = defineProps({
  boardComputed: Object,
});

const cardTriggers = ref({
  buttonTriggers: false,
});

const TogglePopup = (trigger) => {
  cardTriggers.value[trigger] = !cardTriggers.value[trigger];
};

const collaboratorsUserNames = computed(() => {
  const board = props.boardComputed;
  return board ? board.collaborators.map(c => ({ userId: c.userId, userName: c.userName })) : [];
});
</script>
