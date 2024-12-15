<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Sidebar -->
    <div :class="['bg-custom-dark-gray text-white p-6 flex flex-col shadow-lg', isMobile ? 'w-full' : 'lg:w-64']">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold tracking-wide">Panel Admina</h2>
      </div>

      <nav class="space-y-4">
        <router-link to="/admin/employer-verification" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 2H7m4-8h6M3 6h6M3 18h6" />
          </svg>
          <span class="font-medium">Weryfikacja Pracodawców</span>
        </router-link>
        <router-link to="/admin/create-user" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="font-medium">Tworzenie Kont</span>
        </router-link>
        <router-link to="/admin/user-list" class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h3m4 0a9 9 0 11-18 0 9 9 0 0118 0zM9 12h6m-6 4h6" />
          </svg>
          <span class="font-medium">Moderacja Kont</span>
        </router-link>
        <button @click="handleLogout" class="flex items-center p-3 rounded-lg bg-red-600 transition duration-300 hover:bg-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          <span class="font-medium">Wyloguj</span>
        </button>
      </nav>
    </div>

    <!-- Main Content -->
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
