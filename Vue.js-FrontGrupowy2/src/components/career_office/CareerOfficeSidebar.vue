<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
      <div :class="['bg-custom-dark-gray text-white p-6 flex flex-col shadow-lg', isMobile ? 'w-full' : 'lg:w-64']">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-semibold tracking-wide">Panel Biura Karier Studenta</h2>
        </div>
  
        <nav class="space-y-4">
          <router-link to="/career-office/my-materials" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            <span class="font-medium">Moje Materiały</span>
          </router-link>
          <router-link to="/career-office/add-material" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="font-medium">Dodaj Materiał</span>
          </router-link>
          <button @click="handleLogout" class="flex items-center p-3 rounded-lg bg-red-600 transition duration-300 hover:bg-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            <span class="font-medium">Wyloguj</span>
          </button>
        </nav>
      </div>
  
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        isMobile: window.innerWidth <= 768,
      };
    },
    methods: {
      ...mapActions(["logout"]),
      handleLogout() {
        this.logout().then(() => {
          this.$router.push("/login");
        });
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
      },
    },
    mounted() {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.handleResize);
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #121212;
    color: #e0e0e0;
    width: 100%;
  }
  
  .bg-custom-dark-gray {
    background-color: #181818cd;
  }
  
  .hover\:bg-custom-darker-gray:hover {
    background-color: #242424;
  }
  
  @media (max-width: 768px) {
    .lg\:hidden {
      display: none;
    }
    .lg\:block {
      display: block;
    }
  }
  </style>
  