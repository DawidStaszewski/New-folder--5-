<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Sidebar -->
        <div :class="['bg-custom-dark-gray text-white p-6 flex flex-col shadow-lg', isMobile ? 'w-full' : 'lg:w-64']">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-semibold tracking-wide">Panel Studenta</h2>
            </div>

            <nav class="space-y-4">

                <router-link to="/employer/new-offer"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="font-medium">Nowa Oferta</span>
                </router-link>
                <router-link to="/employer/my-offers"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="font-medium">Moje Oferty</span>
                </router-link>
                <router-link to="/employer/my-offers"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="font-medium">Wszystkie Oferty</span>
                </router-link>
                <router-link to="/employer/profile"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 15c1.678 0 3.315.291 4.879.804M9 9h6M7 13h10M12 7c-4.418 0-8 3.582-8 8a1 1 0 001 1h14a1 1 0 001-1c0-4.418-3.582-8-8-8z" />
                    </svg>
                    <span class="font-medium">Uzupełnij Profil</span>
                </router-link>
                <button @click="handleLogout"
                    class="flex items-center p-3 rounded-lg bg-red-600 transition duration-300 hover:bg-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </svg>
                    <span class="font-medium">Wyloguj</span>
                </button>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
            <EmployerHeader />
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import EmployerHeader from "./EmployerHeader.vue";

export default {
    components: {
        EmployerHeader,
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