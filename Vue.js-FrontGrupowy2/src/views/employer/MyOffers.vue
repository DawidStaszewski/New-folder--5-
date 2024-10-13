<template>
    <div class="">
        <div class="flex items-center justify-center py-20">
            <div class="w-3/5 bg-gray-500 border rounded-xl p-6">
                <h2 class="text-center text-2xl mb-4">Moje Oferty</h2>

                <!-- Sprawdzenie, czy są jakieś oferty do wyświetlenia -->
                <div v-if="offers.length > 0" class="flex flex-col gap-4">
                    <div v-for="(offer) in offers" :key="offer.id" class="bg-gray-800 border rounded-xl p-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-xl font-bold">{{ offer.title }}</h3>
                                <p>{{ offer.description }}</p>
                            </div>
                            <button @click="deleteOffer(offer.id)"
                                class="bg-red-500 text-white p-2 rounded">Usuń</button>
                        </div>
                    </div>
                </div>

                <!-- Jeśli nie ma żadnych ofert -->
                <div v-else class="text-center text-white">Nie masz jeszcze żadnych ofert.</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Przechowywanie ofert
const offers = ref([])

// Funkcja do pobierania ofert
const fetchOffers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/offer/list')
        offers.value = response.data.data // Przypisanie danych z odpowiedzi
    } catch (err) {
        console.error('Błąd podczas pobierania ofert', err)
    }
}

// Funkcja do usuwania oferty
const deleteOffer = async (offerId) => {
    try {
        await axios.delete(`http://localhost:8080/api/offer/delete/${offerId}`)
        offers.value = offers.value.filter((offer) => offer.id !== offerId) // Aktualizacja listy po usunięciu
        alert('Oferta została usunięta')
    } catch (err) {
        console.error('Błąd podczas usuwania oferty', err)
    }
}

// Pobranie ofert przy montowaniu komponentu
onMounted(() => {
    fetchOffers()
})
</script>

<style scoped>
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>
