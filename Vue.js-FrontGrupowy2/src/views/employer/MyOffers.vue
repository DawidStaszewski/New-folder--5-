<template>
    <div>
        <div class="flex items-center justify-center py-20">
            <div class="w-3/5 bg-gray-500 border rounded-xl p-6">

                <div class="flex flex-col gap-4">


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

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const offers = ref([])

const fetchOffers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/offer/list')
        console.log('Response data:', response.data)
        offers.value = response.data || []
        console.log('Offers.value:', offers.value)
    } catch (err) {
        console.error('Błąd podczas pobierania ofert', err)
    }
}

const deleteOffer = async (offerId) => {
    try {
        console.log('Usuwanie oferty o ID:', offerId)
        await axios.delete(`http://localhost:8080/api/offer/delete/${offerId}`)
        offers.value = offers.value.filter((offer) => offer.id !== offerId)
        alert('Oferta została usunięta')
    } catch (err) {
        console.error('Błąd podczas usuwania oferty', err)
    }
}

onMounted(() => {
    fetchOffers()
})
</script>

<style scoped></style>
