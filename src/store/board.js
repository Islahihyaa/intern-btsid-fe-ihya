import { defineStore } from "pinia";
import { ref } from "vue";

export const useBoardStore = defineStore('board', () => {
    const board = ref ([
    ])
    
    return {
        board
    }
})