<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <button
      @click="goBack"
      class="mb-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white transition-colors"
    >
      Powrót do listy materiałów edukacyjnych
    </button>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else>
      <h2 class="text-3xl font-bold mb-6 text-indigo-400">{{ material.title }}</h2>
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg whitespace-pre-wrap">
        <p class="text-gray-300">{{ material.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "EducationalMaterialDetail",
  data() {
    return {
      material: {
        title: "",
        description: "",
      },
      isLoading: true,
    };
  },
  methods: {
    async fetchEducationalMaterial() {
      try {
        const response = await api.getEducationalMaterial(this.$route.params.id);
        this.material = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania materiału edukacyjnego:", error);
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.$router.push({ name: "EducationalMaterials" });
    },
  },
  mounted() {
    this.fetchEducationalMaterial();
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
</style>
