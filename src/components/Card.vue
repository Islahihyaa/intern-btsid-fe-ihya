<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Create Board</h2>
                <form @submit.prevent="handleBoard">
                    <div class="mb-4 text-lg">
                        <label for="title">Title Board</label>
                        <input 
                            type="text"
                            placeholder="Title"
                            v-model="boardTitle"
                            class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-ghost" @click="TogglePopup()">Cancel</button>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { createBoard } from '@/services/boardService';
import { mapGetters } from 'vuex';

export default {
    name: "Card",
    props: ['TogglePopup'],
    data() {
        return {
            boardTitle: '',
        }
    }, 
    computed : {
        ...mapGetters(['user'])
    },
    methods: {
        async handleBoard() {
            try {
                const boardData = {
                    boardTitle : this.boardTitle,
                    authorId : "95d78703-55a4-45e5-b6fb-b0eaec85e302"
                }

                const response = await createBoard(boardData);
                console.log('Board Created', response);
                
            } catch (error) {
                if (error.error) {
                    console.log("error create board");
                }
            }
        }
    }
}
</script>