<template>
    <div class="p-8 bg-gray-900 text-white min-h-screen">
      <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Lista Kompetencji</h2>
      <p class="text-lg mb-8 text-center text-gray-300">
        Zarządzaj kompetencjami aplikacji. Możesz przeglądać dostępne kompetencje.
      </p>

      <!-- Notifications -->
      <div v-if="notification.message" :class="`p-4 mb-6 rounded ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`">
        {{ notification.message }}
      </div>

      <!-- Form for Adding Competence -->
      <div class="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold text-indigo-400 mb-4">Dodaj Nową Kompetencję</h3>
        <form @submit.prevent="addCompetence">
          <div class="mb-4">
            <label for="name" class="block text-gray-300 mb-2">Nazwa:</label>
            <input
              id="name"
              v-model="newCompetence.name"
              type="text"
              class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-indigo-400"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-300 mb-2">Opis:</label>
            <textarea
              id="description"
              v-model="newCompetence.description"
              class="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-indigo-400"
            ></textarea>
          </div>
          <button
            type="submit"
            class="p-2 bg-indigo-600 rounded hover:bg-indigo-700 text-white w-full">
            Dodaj Kompetencję
          </button>
        </form>
      </div>

      <div v-if="isInitialLoading" class="flex justify-center items-center">
        <div class="loader"></div>
      </div>
  
      <div v-else>
        <div v-if="competences.length" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div v-for="competence in competences" :key="competence.id" class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold text-indigo-400 mb-4">{{ competence.name }}</h3>
            <p class="text-gray-300 mb-4">
              <strong>Opis:</strong> {{ competence.description || "Brak opisu" }}
            </p>
            <p class="text-gray-300">
              <strong>Data utworzenia:</strong> {{ formatDate(competence.created_at) }}
            </p>
            <button
              @click="deleteCompetence(competence.id)"
              class="mt-4 p-2 bg-red-600 rounded hover:bg-red-700 text-white w-full">
              Usuń
            </button>
          </div>
        </div>
        <div v-else class="text-center text-gray-400">
          <p>Brak kompetencji do wyświetlenia.</p>
        </div>
      </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import api from "@/services/api";

export default {
  name: "CompetenceList",
  data() {
    return {
      competences: [],
      isInitialLoading: true,
      newCompetence: {
        name: "",
        description: "",
      },
      notification: {
        message: "",
        type: "", // 'success' or 'error'
      },
    };
  },
  methods: {
    async fetchCompetences() {
      try {
        const response = await api.getOfferCompetences();
        this.competences = response.data;
      } catch (error) {
        this.showNotification("Błąd podczas pobierania listy kompetencji.", "error");
      } finally {
        this.isInitialLoading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("pl-PL", options);
    },
    async deleteCompetence(competenceId) {
      try {
        await api.deleteOfferCompetence(competenceId);
        this.competences = this.competences.filter((c) => c.id !== competenceId);
        this.showNotification("Kompetencja została pomyślnie usunięta.", "success");
      } catch (error) {
        this.showNotification("Błąd podczas usuwania kompetencji.", "error");
      }
    },
    async addCompetence() {
      try {
        await api.createOfferCompetence(this.newCompetence);
        this.fetchCompetences(); // Pobranie aktualnej listy po dodaniu
        this.newCompetence.name = "";
        this.newCompetence.description = "";
        this.showNotification("Kompetencja została pomyślnie dodana.", "success");
      } catch (error) {
        this.showNotification("Błąd podczas dodawania kompetencji.", "error");
      }
    },
    showNotification(message, type) {
      this.notification.message = message;
      this.notification.type = type;
      setTimeout(() => {
        this.notification.message = "";
        this.notification.type = "";
      }, 3000); // Ukrycie powiadomienia po 3 sekundach
    },
  },
  mounted() {
    this.fetchCompetences();
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
