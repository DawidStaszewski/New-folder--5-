<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">

    <!-- Sekcja filtracji -->
    <div class="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
      <h3 class="text-lg font-semibold text-gray-300 mb-4">Filtruj oferty</h3>
      <div class="flex flex-wrap justify-start gap-4">
        <div class="w-64">
          <label for="type" class="block text-sm font-medium mb-2">Wymiar:</label>
          <select
            id="type"
            v-model="selectedType"
            @change="fetchJobOffersByType"
            class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-full"
          >
            <option value="" selected>Wszystkie wymiary</option>
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="w-64">
          <label for="category" class="block text-sm font-medium mb-2">Kategoria:</label>
          <select
            id="category"
            v-model="selectedCategory"
            @change="fetchJobOffersByCategory"
            class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-full"
          >
            <option value="" selected>Wszystkie kategorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="w-64">
          <label for="searchText" class="block text-sm font-medium mb-2">Szukaj:</label>
          <input
            id="searchText"
            v-model="searchText"
            type="text"
            placeholder="Nazwa, opis, pracodawca, kompetencje..."
            class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-full"
          />
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else-if="filteredJobOffers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="offer in filteredJobOffers"
        :key="offer.id"
        class="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
      >
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4 text-blue-400">{{ offer.title }}</h3>

          <div class="mb-4 flex items-center">
            <span class="text-gray-400 font-semibold mr-2">Pracodawca:</span>
            <span>{{ offer.employer.companyname }}</span>
            <span
              v-if="offer.employer.verified === '1'"
              class="ml-2 text-sm text-green-400 font-bold"
            >
              (Zweryfikowany)
            </span>
          </div>

          <div class="mb-4">
            <p class="text-gray-300 text-sm">
              {{ offer.description.length > 150 ? offer.description.slice(0, 150) + '...' : offer.description }}
            </p>
          </div>
          <div class="mb-4">
            <strong class="block text-gray-400 mb-2">Wymiar:</strong>
            <div class="flex flex-wrap gap-2"> 
            <span
              class="inline-block bg-green-900 text-white px-3 py-1 rounded-full text-xs"
            >
            {{ offer.offer_type.name }}
            </span>
            </div>
          </div>

          <div class="mb-4">
            <strong class="block text-gray-400 mb-2">Wymagane kompetencje:</strong>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="competence in offer.competences"
                :key="competence.id"
                class="inline-block bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
              >
                {{ competence.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="p-4 bg-gray-700 flex items-center justify-between">
          <span class="text-sm text-gray-400">
            Wygasa: {{ new Date(offer.expiration_date).toLocaleDateString() }}
          </span>
          <button
            @click="viewJobOffer(offer)"
            class="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zobacz więcej
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-500 text-lg">Brak ofert pracy pasujących do Twoich kryteriów.</p>
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
      types: [],
      selectedCategory: "",
      selectedType: "",
      searchText: "",
      isLoading: false,
    };
  },
  computed: {
    filteredJobOffers() {
      return this.jobOffers.filter((offer) => {
        const search = this.searchText.toLowerCase();
        const titleMatch = offer.title.toLowerCase().includes(search);
        const descriptionMatch = offer.description.toLowerCase().includes(search);
        const employerMatch = offer.employer.companyname.toLowerCase().includes(search);
        const competenceMatch = offer.competences.some((competence) =>
          competence.name.toLowerCase().includes(search)
        );
        return titleMatch || descriptionMatch || employerMatch || competenceMatch;
      });
    },
  },
  methods: {
    viewJobOffer(offer) {
      this.$router.push({ name: "JobOfferDetails", params: { id: offer.id } });
    },
    async fetchCategories() {
      this.isLoading = true;
      try {
        const response = await api.getCompetenceList();
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTypes() {
      this.isLoading = true;
      try {
        const response = await api.getOfferTypes();
        this.types = response.data;
        console.log("Types loaded:", this.types);
      } catch (error) {
        console.error("Error fetching types:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchJobOffersByCategory() {
      this.isLoading = true;
      if (!this.selectedCategory) {
        await this.fetchJobOffers();
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
      } finally {
        this.isLoading = false;
      }
    },
    async fetchJobOffersByType() {
      this.isLoading = true;
      if (!this.selectedType) {
        await this.fetchJobOffers();
        return;
      }
      try {
        const response = await api.getJobOffersByType(this.selectedType);
        this.jobOffers = response.data.map((offer) => ({
          ...offer,
          showFullDescription: false,
        }));
      } catch (error) {
        console.error("Error fetching job offers by type:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchJobOffers() {
      this.isLoading = true;
      try {
        const response = await api.getJobOffers();
        this.jobOffers = response.data.map((offer) => ({
          ...offer,
          showFullDescription: false,
        }));
      } catch (error) {
        console.error("Error fetching job offers:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchTypes();
    this.fetchJobOffers();
  },
};
</script>

<style scoped>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
</style>
