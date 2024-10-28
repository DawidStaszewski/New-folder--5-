<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import MainSearch from '../components/MainSearch.vue'
</script>


<template class=" w-screen h-full ">
    <div>
        <Header></Header>

        <div class="pt-16 px-72">
            <section class="text-left pl-8 text-28">Search bar?</section>
            <MainSearch class=""></MainSearch>
        </div>

        <div class="_main px-72 gap-x-3 pb-6 flex justify-center">
            <div class="_imainl bg-gray-600 border rounded-xl m-h-full">
                <div class="py-3 px-3">Menu</div>
                <div class="flex flex-col gap-y-3 px-3 py-3">
                    <!-- Użycie router-link do nawigacji -->
                    <router-link to="/EmployerPanel/new-offer">
                        <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Nowa oferta</div>
                    </router-link>
                    <router-link to="/EmployerPanel/my-offers">
                        <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Moje Oferty</div>
                    </router-link>
                    <router-link to="/EmployerPanel/profile">
                        <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Mój Profil</div>
                    </router-link>
                </div>
            </div>

            <div class="_imainr bg-gray-600 border rounded-xl pb-4">
                <!-- Miejsce, gdzie będą wyświetlane podstrony -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import image from "@/assets/img/1.png"
export default {
    components: {
        Header,
        MainSearch
    },
    data() {
        return {
            questions: [],
            imagesrc: image
        };

    },
    methods: {
        async asyncData() {

        },
    },
    mounted() { this.asyncData(); console.log(this.questions) },
}
</script>

<style scoped>
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

._main {
    height: 80vh;
    display: grid;
    grid-template-columns: 30% 70%;
}
</style>
