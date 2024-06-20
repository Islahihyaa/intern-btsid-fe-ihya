<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Create Board</h2>
                <form action="">
                    <div class="mb-4 text-lg">
                        <label for="emaik">Title Board</label>
                        <input 
                            type="text"
                            placeholder="Title"
                            class="w-full px-4 py-2 my-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-ghost" @click="TogglePopup()">Cancel</button>
                        <button class="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: ['TogglePopup']
}
</script>