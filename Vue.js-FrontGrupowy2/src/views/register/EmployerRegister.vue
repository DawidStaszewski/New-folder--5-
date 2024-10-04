<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-4xl w-full shadow-lg rounded-lg overflow-hidden flex">
        <div class="w-1/2 bg-gray-600 p-8">
          <h2 class="text-xl font-bold mb-6">Rejestracja Pracodawcy</h2>
          <form @submit.prevent="register">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 text-left" for="email">Email:</label>
              <input v-model="email" type="email" id="email"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Podaj swój email" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 text-left" for="password">Hasło:</label>
              <input v-model="password" type="password" id="password"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Podaj swoje hasło" required>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 text-left" for="companyname">Nazwa firmy:</label>
              <input v-model="companyname" type="text" id="companyname"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Podaj nazwę swojej firmy" required>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 text-left" for="krsnumber">Numer KRS:</label>
              <input v-model="krsnumber" type="text" id="krsnumber"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Podaj numer KRS firmy" required>
            </div>
            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Zarejestruj
            </button>
          </form>
          <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
        </div>
  
        <div class="w-1/2 bg-gray-500 p-8 flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold mb-6">Masz już konto?</h2>
            <p class="mb-4 text-sm">Jeśli posiadasz konto, możesz się zalogować tutaj!</p>
            <div class="flex flex-col">
              <router-link to="/login"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logowanie</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        companyname: '',
        krsnumber: '',
        error: null,
      };
    },
    methods: {
      register() {
        const registerData = {
          email: this.email,
          password: this.password,
          role_id: 2,
          companyname: this.companyname,
          krsnumber: this.krsnumber,
        };
  
        api.pracodawcaRegister(registerData)
          .then(response => {
            console.log('Registration successful', response.data);
            // this.$router.push('/EmployerDashboard');
          })
          .catch(error => {
            console.error('Registration failed', error);
            this.error = 'Registration failed. Please check your details.';
          });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>