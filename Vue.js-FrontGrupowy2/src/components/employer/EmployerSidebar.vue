<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Sidebar -->
        <div :class="['bg-custom-dark-gray text-white p-6 flex flex-col shadow-lg', isMobile ? 'w-full' : 'lg:w-64']">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-semibold tracking-wide">Panel Pracodawcy</h2>
            </div>

            <nav class="space-y-4">
                <router-link to="/employer/new-offer"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-green-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M12 4v16m8-8H4" />
                    </svg>
                    <span class="font-medium">Nowa Oferta</span>
                </router-link>

                <router-link to="/employer/my-offers"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <span class="font-medium">Moje Oferty</span>
                </router-link>

                <router-link to="/employer/JobOffersEmployer"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-purple-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12h6m-3-3v6m-7 7h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span class="font-medium">Wszystkie Oferty</span>
                </router-link>

                <router-link to="/employer/Applications"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-yellow-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M8 6h13M8 12h9m-9 6h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                    <span class="font-medium">Przeglądaj Aplikacje</span>
                </router-link>

                <router-link to="/employer/profile"
                    class="flex items-center p-3 rounded-lg transition duration-300 hover:bg-custom-darker-gray">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-cyan-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            d="M5.5 21v-2a4.5 4.5 0 014.5-4.5h4a4.5 4.5 0 014.5 4.5v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <span class="font-medium">Uzupełnij Profil</span>
                </router-link>

                <button @click="handleLogout"
                    class="flex items-center p-3 rounded-lg bg-red-600 transition duration-300 hover:bg-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-red-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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