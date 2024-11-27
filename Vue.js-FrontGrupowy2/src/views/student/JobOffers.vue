<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Oferty Pracy</h2>
    <div class="mb-4">
      <label for="category" class="block mb-2">Wybierz kategorię:</label>
      <select
        id="category"
        v-model="selectedCategory"
        @change="fetchJobOffersByCategory"
        class="p-2 rounded border border-gray-600 bg-gray-800 text-white w-full"
      >
        <option value="" disabled selected>Wszystkie kategorie</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <div v-if="jobOffers.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="offer in jobOffers" :key="offer.id" class="bg-gray-800 p-4 rounded">
        <h3 class="text-lg font-bold">{{ offer.title }}</h3>
        <p class="mb-2">{{ offer.description.length > 200 ? offer.description.slice(0, 200) + '...' : offer.description }}</p>
        <button
          @click="viewJobOffer(offer)"
          class="p-2 mt-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          Zobacz pełną ofertę
        </button>
      </div>
    </div>
    <div v-else>
      <p>Brak ofert pracy pasujących do Twoich umiejętności.</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      jobOffers: [],
      categories: [], 
      selectedCategory: "", 
    };
  },
  methods: {
    viewJobOffer(offer) {
      this.$router.push({ name: "JobOfferDetails", params: { id: offer.id } });
    },
    async fetchCategories() {
      try {
        const response = await api.getCompetenceList();
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchJobOffersByCategory() {
      if (!this.selectedCategory) {
        this.fetchJobOffers(); 
        return;
      }
      try {
        const response = await api.getJobOffersByCompetence(this.selectedCategory);
        this.jobOffers = response.data.map((offer) => ({
          ...offer,
          showFullDescription: false,
        }));
      } catch (error) {
        console.error("Error fetching job offers by category:", error);
      }
    },
    async fetchJobOffers() {
      try {
        const response = await api.getJobOffers();
        this.jobOffers = response.data.map((offer) => ({
          ...offer,
          showFullDescription: false,
        }));
      } catch (error) {
        console.error("Error fetching job offers:", error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchJobOffers(); 
  },
};
</script>

<style scoped>
</style>
