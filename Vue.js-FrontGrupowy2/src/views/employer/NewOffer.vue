<template>
    <div class="text-black">
        <div class="flex items-center justify-center py-20">
            <div class="w-3/5 bg-gray-500 border rounded-xl p-6">
                <h2 class="text-center text-2xl mb-4">Dodaj nową Ofertę</h2>
                <form @submit.prevent="addOffer">
                    <div class="mb-4">
                        <label for="title" class="block">Tytuł:</label>
                        <input v-model="offer.title" id="title" type="text" class="w-full p-2 border" required />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block">Opis:</label>
                        <textarea v-model="offer.description" id="description" class="w-full p-2 border"
                            required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="expiration_date" class="block">Data:</label>
                        <input v-model="offer.expiration_date" id="expiration_date" type="date"
                            class="w-full p-2 border" required />
                    </div>
                    <button type="submit" class="bg-green-500 text-white p-2 rounded">Dodaj ofertę</button>
                    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
                    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const offer = ref({
    employer_id: 1,
    title: '',
    description: '',
    expiration_date: '',
})

const successMessage = ref('')
const errorMessage = ref('')

const addOffer = async () => {
    try {
        await axios.post('http://localhost:8080/api/offer/add', offer.value)
        successMessage.value = 'Oferta została dodana pomyślnie!'
        errorMessage.value = ''
        // Resetowanie formularza
        offer.value = { employer_id: 1, title: '', description: '', expiration_date: '' }
    } catch (err) {
        errorMessage.value = 'Błąd podczas dodawania oferty. Spróbuj ponownie.'
        successMessage.value = ''
        console.error('Błąd podczas dodawania oferty', err)
    }
}
</script>
