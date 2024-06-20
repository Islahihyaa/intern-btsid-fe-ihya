<template>
    <div class="flex justify-center items-center min-h-screen bg-[url('../../../public/bg-auth.jpg')] bg-cover">
        <div class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100">
            <div class="flex justify-center items-center mb-8">
                <h1 class="font-sans text-3xl font-semibold text-white">
                    Register
                </h1>
            </div>

            <div>

            </div>

            <form @submit.prevent="handleRegister">
                <div class="mb-4 text-lg">
                    <input 
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" required
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="text"
                        placeholder="Name"
                        v-model="name"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" required
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="password"
                        placeholder="Create Password"
                        v-model="password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" required
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        v-model="passwordConfirmation"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 placeholder-gray-400" required
                    />
                </div>

                <button type="submit"
                    class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
                    >Register
                </button>
            </form>

            <p class="text-sm text-gray-100 mt-4">
                <span>Already have an account?</span>
                <RouterLink to="/login" class="text-blue-500"> 
                    Login Here
                </RouterLink>
            </p> 
            
        </div>
    </div>
</template>

<script>
import { register } from '@/services/authService';

export default {
    data() {
        return {
            email : '',
            name : '',
            password : '',
            passwordConfirmation : ''
        };
    },
    methods: {
        async handleRegister() {
            if (this.password !== this.passwordConfirmation) {
                console.log("Passwords do not match");
                return;
            }

            try {
                const userData = {
                    email : this.email,
                    name : this.name,
                    password : this.password,
                    passwordConfirmation : this.passwordConfirmation
                };
                console.log('Data being sent:', userData);
                const response = await register(userData) 
                console.log('Registration success', response)
                this.$router.push('/login')
            } catch (error) {
                console.log('errsss', error.message) 
            }
        } 
    }
}

</script>