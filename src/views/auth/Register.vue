<template>
    <div class="flex justify-center items-center min-h-screen bg-[url('/bg-auth.jpg')] bg-cover">
      <div class="w-full max-w-md p-8 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100">
        <div class="flex justify-center items-center mb-8">
          <h1 class="font-sans text-3xl font-semibold text-white">
            Register
          </h1>
        </div>
  
        <div v-if="errorMessages.length > 0">
          <div v-for="(errorMessage, index) in errorMessages" :key="index" class="bg-red-300 border border-red-400 text-red-700 px-2 py-1 rounded relative flex justify-center mb-3">
            {{ errorMessage }}
          </div>
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
  
          <button 
            type="submit"
            class="w-full px-4 py-2 text-lg my-4 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
          >
            Register
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
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
        errorMessages: []
      };
    },
    methods: {
      async handleRegister() {
        try {
          const userData = {
            email: this.email,
            name: this.name,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation
          };
          console.log('Data being sent:', userData);
          const response = await register(userData);
          console.log('Registration success', response);
          this.$router.push('/login');
        } catch (error) {
          if (error.error && error.error.message) {
            this.errorMessages = this.formatErrorMessage(error.error.message);
          } else {
            this.errorMessages = ['An error occurred while registering. Please try again later.'];
          }
        }
      },
  
      formatErrorMessage(message) {
        const messages = message.split("; ");
        const formattedMessages = messages.map(msg => {
          if (msg.includes("Invalid email")) {
            return "Invalid email format";
          }
  
          const charMatch = msg.match(/String must contain at least (\d+) character\(s\) at "(.*?)"/);
  
          if (charMatch) {
            const [, charCount, field] = charMatch;
            return `${this.capitalizeFirstLetter(field)} must contain at least ${charCount} characters`;
          }
          return msg;
        });
  
        return formattedMessages;
      },
  
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  }
  </script>
  