<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <button
      @click="goBack"
      class="mb-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white transition-all"
    >
      Powrót do listy materiałów
    </button>
    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>
    <div v-else-if="material" class="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-indigo-400 mb-4">{{ isEditing ? "Edytuj Materiał" : material.title }}</h2>
      <div v-if="!isEditing" class="mb-6">
        <p class="text-gray-300 mb-4 whitespace-pre-wrap">{{ material.description }}</p>
        <button
          @click="enableEditing"
          class="p-3 bg-green-600 rounded hover:bg-green-700 text-white"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Proszę czekać..." : "Edytuj Materiał" }}
        </button>
        <button
          @click="deleteMaterial"
          class="ml-4 p-3 bg-red-600 rounded hover:bg-red-700 text-white"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Proszę czekać..." : "Usuń Materiał" }}
        </button>
      </div>
      <div v-else>
        <form @submit.prevent="updateMaterial">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-2">Tytuł</label>
            <input
              v-model="form.title"
              id="title"
              type="text"
              class="p-2 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium mb-2">Opis</label>
            <textarea
              v-model="form.description"
              id="description"
              rows="6"
              class="p-2 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            class="p-3 bg-green-600 rounded hover:bg-green-700 text-white"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Zapisywanie..." : "Zapisz Zmiany" }}
          </button>
          <button
            @click="cancelEditing"
            type="button"
            class="ml-4 p-3 bg-gray-600 rounded hover:bg-gray-700 text-white"
            :disabled="isSubmitting"
          >
            Anuluj
          </button>
        </form>
      </div>
    </div>
    <div v-else class="text-center text-gray-400">
      <p>Wczytywanie materiału...</p>
    </div>
  </div>
</template>

<script>
import { apiClient } from "@/services/api";

export default {
  name: "MaterialDetail",
  data() {
    return {
      material: null,
      isEditing: false,
      isLoading: true,
      isSubmitting: false,
      form: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    async fetchMaterial() {
      this.isLoading = true;
      try {
        const response = await apiClient.get(`/education_materials/${this.$route.params.id}`);
        this.material = response.data;
        this.form.title = this.material.title;
        this.form.description = this.material.description;
      } catch (error) {
        console.error("Błąd podczas pobierania materiału edukacyjnego:", error);
        alert("Nie udało się wczytać materiału.");
      } finally {
        this.isLoading = false;
      }
    },
    enableEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
      this.form.title = this.material.title;
      this.form.description = this.material.description;
    },
    async updateMaterial() {
      this.isSubmitting = true;
      try {
        await apiClient.put(`/education_materials/update/${this.$route.params.id}`, {
          title: this.form.title,
          description: this.form.description,
        });
        alert("Materiał został zaktualizowany.");
        this.isEditing = false;
        this.fetchMaterial();
      } catch (error) {
        console.error("Błąd podczas aktualizacji materiału edukacyjnego:", error);
        alert("Nie udało się zaktualizować materiału.");
      } finally {
        this.isSubmitting = false;
      }
    },
    async deleteMaterial() {
      const confirmDelete = confirm("Czy na pewno chcesz usunąć ten materiał?");
      if (!confirmDelete) return;

      this.isSubmitting = true;
      try {
        await apiClient.delete(`/education_materials/delete/${this.$route.params.id}`);
        alert("Materiał został usunięty.");
        this.goBack();
      } catch (error) {
        console.error("Błąd podczas usuwania materiału edukacyjnego:", error);
        alert("Nie udało się usunąć materiału.");
      } finally {
        this.isSubmitting = false;
      }
    },
    goBack() {
      this.$router.push({ name: "CareerOfficeMaterials" });
    },
  },
  mounted() {
    this.fetchMaterial();
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

h2 {
  color: #a5b4fc;
}
</style>
