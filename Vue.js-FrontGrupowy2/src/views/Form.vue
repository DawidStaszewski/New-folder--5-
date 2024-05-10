<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
</script>


<template class="w-screen h-full">
    <Header></Header>
    <div class="flex justify-center pt-24">
        <form class="w-full max-w-lg ">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                    <label class="_label block mb-2" for="grid-first-name">
                        First Name
                    </label>

                    <input class="_cinput mb-3" id="grid-first-name" type="text">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="_label block mb-2" for="grid-last-name">
                        Last Name
                    </label>
                    <input class="_cinput " id="grid-last-name" type="text">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="_label block mb-2" for="grid-password">
                        Password
                    </label>
                    <input class="_cinput mb-3 text-black" id="grid-password" type="password">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="_label block mb-2" for="grid-city">
                        City
                    </label>
                    <input class="_cinput" id="grid-city" type="text">
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="_label block mb-2" for="grid-state">
                        State
                    </label>
                    <div class="relative">
                        <select class="_cinput pr-8" id="grid-state">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="_label block mb-2" for="grid-zip">
                        Zip
                    </label>
                    <input class="_cinput" id="grid-zip" type="text">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    components: {
        Header
    },
    data() {
        return {
            questions: []
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

.app {
    width: 100%;
    height: 100vh;
}

.input {
    appearance: none;
}

._cinput {
    color: black;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
    display: block;
    border-width: 1px;
    border-radius: 0.25rem;
    line-height: 1.25;
    width: 100%;
    outline: 2px solid transparent;
    outline-offset: 2px;
}

._label {
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
</style>
