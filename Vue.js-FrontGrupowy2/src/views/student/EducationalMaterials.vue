<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Materiały Edukacyjne</h2>
    <p class="text-lg mb-8 text-center text-gray-300">
      Znajdź materiały, które pomogą Ci w przygotowaniach do budowy CV, rozmów o pracę, i innych aspektów kariery!
    </p>
    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>
    <div v-else-if="materials.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div v-for="material in materials" :key="material.id" class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold text-indigo-400 mb-4">{{ material.title }}</h3>
        <p class="text-gray-300 mb-4 whitespace-pre-wrap">{{ getShortDescription(material.description) }}</p>
        <router-link :to="`/student/educational-materials/${material.id}`" class="text-indigo-400 hover:underline">
          Czytaj więcej
        </router-link>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">
      <p>Brak dostępnych materiałów edukacyjnych.</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      materials: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchEducationalMaterials() {
      this.isLoading = true;
      try {
        const response = await api.getEducationalMaterials();
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
    this.fetchEducationalMaterials();
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

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(75, 85, 99, 0.2);
}

a:hover {
  color: #6b46c1;
  text-decoration: underline;
}

h2 {
  color: #a5b4fc;
}
</style>
