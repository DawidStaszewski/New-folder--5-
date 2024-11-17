<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-4xl w-full shadow-lg rounded-lg overflow-hidden flex">
      <div class="w-1/2 bg-gray-600 p-8">
        <h2 class="text-xl font-bold mb-6">Logowanie</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 text-left" for="email">Email:</label>
            <input v-model="email" type="email" id="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Podaj swój email" required>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 text-left" for="password">Hasło</label>
            <input v-model="password" type="password" id="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Podaj swoje hasło" required>
          </div>
          <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Zaloguj
          </button>
        </form>
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      </div>

      <div class="w-1/2 bg-gray-500 p-8 flex flex-col justify-between">
        <div>
          <h2 class="text-xl font-bold mb-6">Jesteś nowym użytkownikiem?</h2>
          <p class="mb-4 text-sm">Jesteś studentem lub niedawno skończyłeś studia i szukasz swojej pierwszej pracy?
            Zarejestruj się tutaj!</p>
          <div class="flex flex-col mb-6">
            <router-link to="/student/register"
              class="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Rejestracja
              Studenta/Absolwenta</router-link>
          </div>
          <p class="mb-4">Jesteś pracodawcą i szukasz zdolnych absolwentów do swojego zespołu? Zarejestruj się tutaj!
          </p>
          <div class="flex flex-col">
            <router-link to="/employer/register"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Rejestracja
              Pracodawcy</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['setUser']),
    async login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await api.studentLogin(loginData);
        const { token, role } = response.data;
        console.log('Login successful', response.data);

        // Save token and user role to Vuex store
        this.setUser({ token, role });
        localStorage.setItem('token', token);
        localStorage.setItem("role", role);
        // Redirect based on role
        switch (role) {
          case 1: // Student
            this.$router.push('/student/ProfilePage');
            break;
          case 2: // Employer
            this.$router.push('/Employer');
            break;
          case 4: // Administrator
            this.$router.push('/AdminDashboard');
            break;
          default:
            this.error = 'Invalid role. Please try again.';
        }
      } catch (error) {
        console.error('Login failed', error);
        this.error = 'Login failed. Please check your credentials.';
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>