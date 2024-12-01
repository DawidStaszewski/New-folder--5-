<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Twoje Materiały Edukacyjne</h2>
    <p class="text-lg mb-8 text-center text-gray-300">
      Lista materiałów edukacyjnych utworzonych przez Ciebie. Kliknij "Przejdź do materiału", aby zobaczyć pełne szczegóły.
    </p>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else-if="materials.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="material in materials" :key="material.id" class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold text-indigo-400 mb-4">{{ material.title }}</h3>
        <p class="text-gray-300 mb-4 whitespace-pre-wrap">
          {{ getShortDescription(material.description) }}
        </p>
        <router-link
          :to="`/career-office/my-materials/${material.id}`"
          class="p-3 bg-blue-600 rounded hover:bg-blue-700 text-white block text-center transition-all"
        >
          Przejdź do materiału
        </router-link>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">
      <p>Brak utworzonych materiałów edukacyjnych.</p>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/services/api";

export default {
  name: "CareerOfficeMaterials",
  data() {
    return {
      materials: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchMaterials() {
      this.isLoading = true;
      try {
        const response = await apiClient.get("/education_materials/my");
        this.materials = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania materiałów edukacyjnych:", error);
      } finally {
        this.isLoading = false;
      }
    },
    getShortDescription(description) {
      const lines = description.split("\n");
      return lines.slice(0, 3).join("\n") + (lines.length > 3 ? "..." : "");
    },
  },
  mounted() {
    this.fetchMaterials();
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

button:hover,
a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(99, 102, 241, 0.4);
}

h2 {
  color: #a5b4fc;
}
</style>
