<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-md p-8 rounded-lg shadow-md bg-slate-200">
            <div class="flex justify-center items-center mb-8">
                <h1 class="font-sans text-3xl font-semibold">
                    Register
                </h1>
            </div>

            <div>

            </div>

            <form action="">
                <div class="mb-4 text-lg">
                    <input 
                        type="text"
                        placeholder="Email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="password"
                        placeholder="Create Password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div class="mb-4 text-lg">
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <button
                    class="w-full px-4 py-2 text-lg my-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring"
                    >Login
                </button>
            </form>

            <p class="text-sm text-gray-500 mt-4">
                <span>Already have an account?</span>
                <RouterLink to="/login" class="text-blue-500"> 
                    Login Here
                </RouterLink>
            </p> 
            
        </div>
    </div>
</template>