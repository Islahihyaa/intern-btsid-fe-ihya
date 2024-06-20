<template>
    <div class="flex justify-center items-center min-h-screen bg-[url('../../../public/bg-auth.jpg')] bg-cover">
        <div class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100">
            <div class="flex justify-center items-center mb-8">
                <h1 class="font-sans text-3xl font-semibold text-white">
                    Login
                </h1>
            </div>

            <div>

            </div>

            <form @submit.prevent="handleLogin">
                <div class="mb-4 text-lg">
                    <input 
                        type="text"
                        placeholder="Email"
                        v-model="email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <button
                    class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
                    >Login
                </button>
            </form>

            <p class="text-sm text-gray-100 mt-4">
                <span>Don't have an account?</span>
                <RouterLink to="/register" class="text-blue-500"> 
                    Register Here
                </RouterLink>
            </p> 
            
        </div>
    </div>
</template>

<script>
import { login } from '@/services/authService';

export default {
    data() {
        return {
            email : '',
            password : '',
        };
    },
    methods: {
        async handleLogin() {
            try {
                const userData = {
                    email : this.email,
                    password : this.password,
                };

                console.log('Data being sent:', userData);
                const response = await login(userData) 
                console.log('Registration success', response)
                this.$router.push('/')
            } catch (error) {
                console.log('errsss', error.message) 
            }
        } 
    }
}

</script>

<style>
.bg-cover {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
}
</style>