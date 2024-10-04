<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
import MainSearch from '../components/MainSearch.vue'
</script>

<template class="w-screen h-full">
    <div>
        <Header></Header>
        <div class="flex justify-center pt-24">
            <form class="w-full max-w-lg" @submit.prevent="register">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="_label block mb-2">
                            Imię
                        </label>
                        <input class="_cinput mb-3" type="text" v-model="firstName">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="_label block mb-2">
                            Nazwisko
                        </label>
                        <input class="_cinput" type="text" v-model="lastName">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="_label block mb-2">
                            Email
                        </label>
                        <input class="_cinput mb-3 text-black" type="email" v-model="email">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="_label block mb-2">
                            Password
                        </label>
                        <input class="_cinput mb-3 text-black" type="password" v-model="password">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="_label block mb-2">
                            Uczelnia
                        </label>
                        <input class="_cinput mb-3 text-black" type="text" v-model="about">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="_label block mb-2">
                            Kompetencje
                        </label>
                        <input class="_cinput mb-3 text-black" type="text" v-model="skills">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="_label block mb-2">
                            Zdjecie
                        </label>
                        <input class="_cinput" type="file" @change="handleFileUpload">
                    </div>
                </div>
                <button type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Utwórz Konto
                </button>
                <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import api from '../services/api';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const about = ref('');
const skills = ref('');
const file = ref(null);
const error = ref(null);

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};

const register = async () => {
    const formData = new FormData();
    formData.append('imie', firstName.value);
    formData.append('nazwisko', lastName.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('opis', about.value);
    formData.append('kompetencje', skills.value);
    if (file.value) {
        formData.append('zdjecie', file.value);
    }

    try {
        const response = await api.studentRegister(formData);
        console.log('Registration successful', response.data);
        // Handle successful registration, e.g., redirect or show a message
    } catch (err) {
        console.error('Registration failed', err);
        error.value = 'Registration failed. Please check your input.';
    }
};
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
