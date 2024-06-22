<template>
    <div class="main-container h-screen overflow-hidden" data-theme="dark">
        <Navbar />
        <div class="flex">
            <Sidebar/>
            <div class="flex-1 p-4">
                <!-- Konten utama Anda -->
                 
                 
                 <p class="text-white">main content here</p>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'


export default {
    name: "Home",
    components: {
        Navbar,
        Sidebar,
    },

}
</script>

<style>

</style>
