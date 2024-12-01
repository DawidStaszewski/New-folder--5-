<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Zarządzanie Pracodawcami</h2>
    <p class="text-lg mb-8 text-center text-gray-300">
      Poniżej znajduje się lista pracodawców oczekujących na weryfikację. Możesz ich zweryfikować lub zbanować.
    </p>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else-if="employers.length" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="employer in employers"
        :key="employer.id"
        class="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h3 class="text-xl font-semibold text-indigo-400 mb-4">
          {{ employer.company_name || "Nieznana Firma" }}
        </h3>
        <p class="text-gray-300 mb-2"><strong>KRS:</strong> {{ employer.krs_number || "Brak danych" }}</p>
        <p class="text-gray-300 mb-4">
          <strong>Email:</strong>
          {{ employer.user?.email || "Brak danych" }}
        </p>
        <div class="flex gap-4">
          <button
            @click="handleVerify(employer.id)"
            class="p-3 bg-green-600 rounded hover:bg-green-700 text-white w-full flex justify-center items-center"
            :disabled="isSubmitting.verify[employer.id]"
          >
            <span v-if="isSubmitting.verify[employer.id]" class="loader-button mr-2"></span>
            {{ isSubmitting.verify[employer.id] ? "Weryfikuję..." : "Zweryfikuj" }}
          </button>
          <button
            @click="handleBan(employer.user?.id)"
            class="p-3 bg-red-600 rounded hover:bg-red-700 text-white w-full flex justify-center items-center"
            :disabled="!employer.user?.id || isSubmitting.ban[employer.user?.id]"
          >
            <span v-if="isSubmitting.ban[employer.user?.id]" class="loader-button mr-2"></span>
            {{ isSubmitting.ban[employer.user?.id] ? "Banuję..." : "Zbanuj" }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-400">
      <p>Brak pracodawców oczekujących na weryfikację.</p>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { apiClient } from "@/services/api";

export default {
  name: "EmployersList",
  data() {
    return {
      employers: [],
      isLoading: true,
      isSubmitting: reactive({
        verify: {},
        ban: {},
      }),
    };
  },
  methods: {
    async fetchEmployers() {
      this.isLoading = true;
      try {
        const response = await apiClient.get("/admin/employers");
        this.employers = response.data.data.filter((employer) => employer.user);
      } catch (error) {
        console.error("Błąd podczas pobierania listy pracodawców:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async handleVerify(employerId) {
      this.isSubmitting.verify[employerId] = true;
      try {
        await apiClient.patch(`/admin/employers/${employerId}`, { verified: 1 });
        alert("Pracodawca został zweryfikowany.");
        const employerIndex = this.employers.findIndex((employer) => employer.id === employerId);
        if (employerIndex !== -1) {
          this.employers.splice(employerIndex, 1);
        }
      } catch (error) {
        console.error("Błąd podczas weryfikacji pracodawcy:", error);
        alert("Wystąpił błąd podczas weryfikacji pracodawcy.");
      } finally {
        this.isSubmitting.verify[employerId] = false;
      }
    },
    async handleBan(userId) {
      if (!userId) {
        alert("Nie można zbanować tego użytkownika. Brakuje identyfikatora użytkownika.");
        return;
      }
      this.isSubmitting.ban[userId] = true;
      try {
        await apiClient.post(`/admin/blacklist/${userId}`);
        alert("Pracodawca został zbanowany.");
        const employerIndex = this.employers.findIndex((employer) => employer.user?.id === userId);
        if (employerIndex !== -1) {
          this.employers.splice(employerIndex, 1);
        }
      } catch (error) {
        console.error("Błąd podczas banowania pracodawcy:", error);
        alert("Wystąpił błąd podczas banowania pracodawcy.");
      } finally {
        this.isSubmitting.ban[userId] = false;
      }
    },
  },
  mounted() {
    this.fetchEmployers();
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
</style>
