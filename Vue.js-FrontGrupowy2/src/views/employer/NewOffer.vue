<template>
    <div class="text-black">
        <div class="flex items-center justify-center py-20">
            <div class="w-3/5 bg-gray-500 border rounded-xl p-6">
                <h2 class="text-center text-2xl mb-4 text-white">Dodaj nową Ofertę</h2>
                <form @submit.prevent="addOffer">
                    <div class="mb-4">
                        <label for="title" class="block text-white">Tytuł:</label>
                        <input v-model="offer.title" id="title" type="text" class="w-full p-2 border" required />
                    </div>
                    <div class="mb-4">
                        <label for="description" class="block text-white">Opis:</label>
                        <textarea v-model="offer.description" id="description" class="w-full p-2 border" required></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="expiration_date" class="block text-white">Data:</label>
                        <input v-model="offer.expiration_date" id="expiration_date" type="date" class="w-full p-2 border" required />
                    </div>
                    <div class="mb-4">
                        <label for="offer_type" class="block text-center mb-2 text-white">Typ oferty:</label>
                        <div class="flex justify-center">
                            <div 
                            v-for="(type, index) in offerTypes" 
                            :key="type.id" 
                            class="mr-4 mb-2">
                                <input 
                                type="radio" 
                                :id="'offer_type_' + type.id" 
                                v-model="offer.type" 
                                :value="type.id" 
                                class="hidden"
                                />
                                <label 
                                    :for="'offer_type_' + type.id" 
                                    :class="[
                                        'p-3 px-6 rounded-full cursor-pointer text-center transition duration-200',
                                        offer.type === type.id ? 'bg-blue-900 text-white' : 'bg-gray-200'
                                    ]">
                                    {{ type.name }}
                                </label>
                            </div>
                        </div>
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
import { ref, onMounted } from "vue";
import api from '@/services/api';

const offer = ref({
    title: '',
    description: '',
    expiration_date: '',
    type: '', 
});

const offerTypes = ref([]);
const successMessage = ref('');
const errorMessage = ref('');

const fetchOfferTypes = async () => {
    try {
        const response = await api.getOfferTypes();
        const data = response.data;
        
        if (Array.isArray(data)) {
            offerTypes.value = data;
            // Ustawiamy domyślną wartość dla typu oferty, np. pierwszy typ
            if (offerTypes.value.length > 0) {
                offer.value.type = offerTypes.value[0].id;
            }
        } else {
            errorMessage.value = 'Błąd: Odpowiedź API nie zawiera tablicy.';
        }
    } catch (error) {
        errorMessage.value = 'Nie udało się pobrać danych użytkownika.';
    }
};

onMounted(fetchOfferTypes);

const addOffer = async () => {
    try {
        await api.createOffer(offer.value);
        successMessage.value = 'Oferta została dodana pomyślnie!';
        errorMessage.value = '';
        offer.value = { title: '', description: '', expiration_date: '', type: '' };
    } catch (err) {
        errorMessage.value = 'Błąd podczas dodawania oferty. Spróbuj ponownie.';
        successMessage.value = '';
    }
};
</script>
