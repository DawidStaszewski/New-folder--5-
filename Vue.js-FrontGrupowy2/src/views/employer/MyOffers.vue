<template>
    <div class="p-8 bg-gray-900 text-white min-h-screen">
        <!-- Tytuł strony -->
        <h2 class="text-2xl font-bold text-blue-400 mb-6">Moje Oferty Pracy</h2>

        <!-- Sekcja filtracji -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
            <h3 class="text-lg font-semibold text-gray-300 mb-4">Filtruj oferty</h3>
            <div class="flex flex-wrap justify-start gap-4">
                <div class="w-64">
                    <label for="categoryFilter" class="block text-sm font-medium mb-2">Kategoria:</label>
                    <select id="categoryFilter" v-model="selectedCategory" @change="filterOffers"
                        class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-full">
                        <option value="">Wszystkie kategorie</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Lista ofert -->
        <div v-if="filteredOffers.length > 0" class="flex flex-col gap-6">
            <div v-for="offer in filteredOffers" :key="offer.id"
                class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-xl font-bold text-blue-400 mb-2">{{ offer.title }}</h3>
                        <p class="text-gray-300 text-sm mb-4">
                            {{ offer.description.length > 150 ? offer.description.slice(0, 150) + '...' :
                        offer.description }}
                        </p>
                        <p class="text-sm text-gray-400">
                            Wygasa: {{ new Date(offer.expiration_date).toLocaleDateString() }}
                        </p>
                    </div>
                    <button @click="deleteOffer(offer.id)"
                        class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                        Usuń
                    </button>
                </div>
            </div>
        </div>

        <!-- Komunikat pustego stanu -->
        <div v-else class="text-center">
            <p class="text-gray-500 text-lg">Nie znaleziono ofert pasujących do wybranych kryteriów.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const offers = ref([]);
const filteredOffers = ref([]);
const categories = ref([]);
const selectedCategory = ref("");

// Pobieranie ofert pracy
const fetchOffers = async () => {
    try {
        const response = await api.myOffers();
        offers.value = response.data || [];
        filteredOffers.value = [...offers.value];
    } catch (err) {
        console.error("Błąd podczas pobierania ofert", err);
    }
};

// Pobieranie listy kategorii
const fetchCategories = async () => {
    try {
        const response = await api.getCompetenceList();
        categories.value = response.data || [];
    } catch (err) {
        console.error("Błąd podczas pobierania kategorii", err);
    }
};

// Filtrowanie ofert po kategoriach
const filterOffers = () => {
    if (!selectedCategory.value) {
        filteredOffers.value = [...offers.value];
    } else {
        filteredOffers.value = offers.value.filter((offer) =>
            offer.competences.some((competence) => competence.id === selectedCategory.value)
        );
    }
};

// Usuwanie oferty
const deleteOffer = async (offerId) => {
    try {
        await api.deleteOffer(offerId); // assuming you have a delete method in your api service
        offers.value = offers.value.filter((offer) => offer.id !== offerId);
        filterOffers(); // Aktualizacja widoku po usunięciu
        alert("Oferta została usunięta");
    } catch (err) {
        console.error("Błąd podczas usuwania oferty", err);
    }
};

// Inicjalizacja danych
onMounted(async () => {
    await fetchOffers();
    await fetchCategories();
});
</script>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
</style>
