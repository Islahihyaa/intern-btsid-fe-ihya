<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Create Task</h2>
                <form @submit.prevent="handleList">
                    <div class="mb-4 text-lg">
                        <label for="title">Title List</label>
                        <input 
                            type="text"
                            placeholder="Title"
                            v-model="listTitle"
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
import { createList } from '@/services/listService';

export default {
    name: "ListCard",
    props: ['TogglePopup'],
    data() {
        return {
            listTitle: '',
        }
    },
    methods: {
        async handleList() {
            try {
                const listData = {
                    listTitle: this.listTitle,
                    authorId : "f88d04c3-0b54-456f-944e-e48889535190",
                    boardId : "972d92e1-d362-4149-a6c6-4e494caf47be"
                }
                const accessToken = localStorage.getItem('token');
                const response = await createList(listData, accessToken)
                console.log('List Created', response)
                
            } catch (error) {
                if (error.error) {
                    console.log("error create list");
                }
            }
        }
    }

}
</script>