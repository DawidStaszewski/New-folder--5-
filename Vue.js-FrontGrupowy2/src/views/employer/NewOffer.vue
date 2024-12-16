<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
      <!-- Nagłówek strony -->
      <h2 class="text-2xl font-bold text-blue-400 text-center mb-6">Dodaj Nową Ofertę</h2>

      <div class="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <form @submit.prevent="addOffer">
              <!-- Pole: Tytuł -->
              <div class="mb-6">
                  <label for="title" class="block text-sm font-medium text-gray-300 mb-2">Tytuł:</label>
                  <input v-model="offer.title" id="title" type="text"
                      class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Wprowadź tytuł oferty" required />
              </div>

              <!-- Pole: Opis -->
              <div class="mb-6">
                  <label for="description" class="block text-sm font-medium text-gray-300 mb-2">Opis:</label>
                  <textarea v-model="offer.description" id="description" rows="4"
                      class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Opisz szczegóły oferty" required></textarea>
              </div>

              <!-- Pole: Data wygaśnięcia -->
              <div class="mb-6">
                  <label for="expiration_date" class="block text-sm font-medium text-gray-300 mb-2">Data wygaśnięcia:</label>
                  <input v-model="offer.expiration_date" id="expiration_date" type="date"
                      class="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required />
              </div>

              <!-- Wybór typu oferty -->
              <div class="mb-6">
                  <label for="offer_type" class="block text-sm font-medium text-gray-300 mb-4">Typ oferty:</label>
                  <div class="flex flex-wrap gap-4">
                      <div v-for="type in offerTypes" :key="type.id" class="flex items-center">
                          <input type="radio" :id="'offer_type_' + type.id" v-model="offer.type" :value="type.id"
                              class="hidden" />
                          <label :for="'offer_type_' + type.id"
                              :class="['py-2 px-4 rounded-lg cursor-pointer transition duration-200', offer.type === type.id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
                              {{ type.name }}
                          </label>
                      </div>
                  </div>
              </div>

              <!-- Przycisk Dodawania -->
              <div class="text-center">
                  <button type="submit"
                      class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200">
                      Dodaj ofertę
                  </button>
              </div>

              <!-- Wiadomości o sukcesie / błędzie -->
              <p v-if="successMessage" class="text-center text-green-500 mt-4">{{ successMessage }}</p>
              <p v-if="errorMessage" class="text-center text-red-500 mt-4">{{ errorMessage }}</p>
          </form>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const offer = ref({
  title: "",
  description: "",
  expiration_date: "",
  type: "",
});

const offerTypes = ref([]);
const successMessage = ref("");
const errorMessage = ref("");

const fetchOfferTypes = async () => {
  try {
      const response = await api.getOfferTypes();
      const data = response.data;

      if (Array.isArray(data)) {
          offerTypes.value = data;
          if (offerTypes.value.length > 0) {
              offer.value.type = offerTypes.value[0].id;
          }
      } else {
          errorMessage.value = "Błąd: Odpowiedź API nie zawiera tablicy.";
      }
  } catch (error) {
      console.error("Error fetching offer types:", error);
      errorMessage.value = "Nie udało się pobrać danych użytkownika.";
  }
};

onMounted(fetchOfferTypes);

const addOffer = async () => {
  try {
      await api.createOffer(offer.value);
      successMessage.value = "Oferta została dodana pomyślnie!";
      errorMessage.value = "";
      offer.value = { title: "", description: "", expiration_date: "", type: "" };
  } catch (err) {
      errorMessage.value = "Błąd podczas dodawania oferty. Spróbuj ponownie.";
      successMessage.value = "";
  }
};
</script>

<style scoped>
label {
  font-size: 0.875rem;
}

button {
  font-size: 1rem;
}
</style>
