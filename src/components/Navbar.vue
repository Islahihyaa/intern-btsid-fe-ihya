<template>
    <div class="navbar border-b-2 border-slate-600 ">
        <div class="flex-1 items-center">
            <a class="btn btn-ghost text-2xl">Trello App</a>
            <ul class="menu menu-horizontal px-1 flex items-center">
                <li class="text-lg"><a>link</a></li>
                <li class="">
                    <details>
                    <summary class="text-lg">
                        Workspaces
                    </summary>
                    <ul class="p-2 bg-base-100 rounded-t-none">
                        <p class="">Your Workspaces</p>
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                    </ul>
                    </details>
                </li>
            </ul>
            <button @click="() => TogglePopup('buttonTriggers')" class="btn btn-info text-sm px-4 py-1">Create</button>
            <Card v-if="cardTriggers.buttonTriggers" :TogglePopup="() => TogglePopup('buttonTriggers')" />
        </div>
        <div class="flex-none gap-2">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="/src/assets/images/photo.webp" />
                    </div>
                </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a class="justify-between">
                    Profile
                    <span class="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>
    
</template>

<script>
import Card from '@/components/Card.vue'
import { ref } from 'vue'

export default {
    name: "Navbar",
    components: {
        Card
    },
    methods: {
        createCard() {
            this.$emit('createCard')
        }
    },
    setup() {
        const cardTriggers =  ref ({
            buttonTriggers: false,

        });

        const TogglePopup = (trigger) => {
            cardTriggers.value[trigger] = !cardTriggers.value[trigger]
        }

        return {
            cardTriggers,
            TogglePopup
        }
    }
};
</script>
