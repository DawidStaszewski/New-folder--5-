<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <button
      @click="goBack"
      class="mb-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white transition-all"
    >
      Powrót do listy materiałów
    </button>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-indigo-400 mb-4">Dodaj Nowy Materiał Edukacyjny</h2>
      <form @submit.prevent="addMaterial">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium mb-2">Tytuł</label>
          <input
            v-model="form.title"
            id="title"
            type="text"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Wprowadź tytuł"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium mb-2">Opis</label>
          <textarea
            v-model="form.description"
            id="description"
            rows="6"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Wprowadź opis materiału"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="p-3 bg-green-600 rounded hover:bg-green-700 text-white flex items-center justify-center"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loader-button mr-2"></span>
          {{ isLoading ? "Dodawanie..." : "Dodaj Materiał" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/services/api";

export default {
  name: "AddMaterial",
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async addMaterial() {
      this.isLoading = true;
      try {
        await apiClient.post("/education_materials/add", {
          title: this.form.title,
          description: this.form.description,
        });
        alert("Materiał został pomyślnie dodany!");
        this.goBack();
      } catch (error) {
        console.error("Błąd podczas dodawania materiału edukacyjnego:", error);
        alert("Wystąpił problem podczas dodawania materiału.");
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.$router.push({ name: "CareerOfficeMaterials" });
    },
  },
};
</script>

<style scoped>
.loader-button {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
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

h2 {
  color: #a5b4fc;
}
</style>
