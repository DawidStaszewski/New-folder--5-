<template>
    <div class=" text-black">

        <div class="flex items-center justify-center py-20">
            <div class="w-3/5 bg-gray-500 border rounded-xl p-6">
                <h2 class="text-center text-2xl mb-4">Dodaj nową Ofertę</h2>
                <form @submit.prevent="addOffer">
                    <div class="mb-4">
                        <label for="title" class="block">Tytuł:</label>
                        <input v-model="offer.title" id="title" type="text" class="w-full p-2 border" />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block">Opis:</label>
                        <textarea v-model="offer.description" id="description" class="w-full p-2 border"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="employer_id" class="block">ID Pracodawcy:</label>
                        <input v-model="offer.employer_id" id="employer_id" type="number" class="w-full p-2 border" />
                    </div>
                    <button type="submit" class="bg-green-500 text-white p-2 rounded">Dodaj ofertę</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import axios from 'axios'

const offer = ref({
    employer_id: null,
    title: '',
    description: '',
})

const addOffer = async () => {
    try {
        await axios.post('http://localhost:8080/api/offer/add', offer.value)
        offer.value = { employer_id: null, title: '', description: '' }
    } catch (err) {
        console.error('Błąd podczas dodawania oferty', err)
    }
}
</script>
