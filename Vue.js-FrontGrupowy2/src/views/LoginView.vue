<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
</script>


<template class="w-screen h-full">
    <Header></Header>
    <div>
        <div class="flex justify-center pt-36">
            <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                        <label class="_label block mb-2">
                            Email
                        </label>

                        <input class="_cinput mb-3" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="_label block mb-2">
                            Password
                        </label>
                        <input class="_cinput " type="text">
                    </div>
                </div>
                <div>
                    <button
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-center flex"
                        @click="LoginForm">Login</button>
                </div>
            </form>
        </div>
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
        LoginForm() {
            this.$router.push('/StudentForm');
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
