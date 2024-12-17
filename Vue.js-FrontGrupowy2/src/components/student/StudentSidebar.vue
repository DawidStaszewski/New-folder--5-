<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
      <!-- Sidebar -->
      <div :class="['bg-custom-dark-gray text-white p-6 flex flex-col shadow-lg', isMobile ? 'w-full' : 'lg:w-64']">
          <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-semibold tracking-wide">Panel Studenta</h2>
          </div>

          <nav class="space-y-4">
              <router-link to="/student/quiz" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <span class="font-medium">Quiz Predyspozycji</span>
              </router-link>

              <router-link to="/student/educational-materials" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4l-6 6 6 6 6-6-6-6z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8m-4 4v8" />
                  </svg>
                  <span class="font-medium">Materiały Edukacyjne</span>
              </router-link>

              <router-link to="/student/job-offers" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <span class="font-medium">Oferty Pracy</span>
              </router-link>

              <router-link to="/student/my_applications" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6M12 9v6m7-7H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z" />
                  </svg>
                  <span class="font-medium">Moje Aplikacje</span>
              </router-link>

              <router-link to="/student/profile" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 21v-2a4.5 4.5 0 014.5-4.5h4a4.5 4.5 0 014.5 4.5v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  <span class="font-medium">Uzupełnij Profil</span>
              </router-link>

              <button @click="handleLogout" class="flex items-center p-3 rounded-lg bg-red-600 transition duration-300 hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  </svg>
                  <span class="font-medium">Wyloguj</span>
              </button>
          </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1">
          <StudentHeader />
          <router-view></router-view>
      </div>
  </div>
</template>
  
  <script>
  import { mapActions } from "vuex";
  import StudentHeader from "./StudentHeader.vue";
  
  export default {
    components: {
      StudentHeader,
    },
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