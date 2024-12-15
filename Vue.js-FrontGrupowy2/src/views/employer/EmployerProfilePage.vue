<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Profil Pracodawcy</h2>
    <div class="mb-6">
      <p class="text-lg"><strong>Opis:</strong> {{ fetchedProfile.description }}</p>
    </div>

    <h3 class="text-lg font-semibold mb-4">Zaktualizuj Dane</h3>
    <form @submit.prevent="updateProfile">

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium mb-2">Opis</label>
        <textarea v-model="formProfile.description" id="description" class="p-2 w-full bg-gray-700 rounded"
          rows="4"></textarea>
      </div>

      <button type="submit" class="p-2 bg-indigo-600 rounded hover:bg-indigo-700">
        Zapisz Zmiany
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import api from "@/services/api";

export default {
  name: "EmployerProfile",
  setup() {
    // Przechowuje dane z backendu do wyświetlenia
    const fetchedProfile = reactive({

      description: "",
    });

    // Formularz edycji danych
    const formProfile = reactive({

      description: "",
    });

    // Pobiera dane z backendu
    const fetchStudentProfile = async () => {
      try {
        const response = await api.getUser();
        const data = response.data.user.data;

        fetchedProfile.description = data.description || "";

        formProfile.description = fetchedProfile.description;

        console.log("Pobrano dane profilu:", fetchedProfile);
      } catch (error) {
        console.error("Błąd podczas pobierania danych studenta:", error);
      }
    };

    // Aktualizuje dane w backendzie
    const updateProfile = async () => {
      try {
        const response = await api.UpdateEmployer({
          description: formProfile.description,
        });

        // Odświeża dane z backendu po udanej aktualizacji
        await fetchStudentProfile();

        console.log("Profil zaktualizowany:", response.data);
        alert("Profil został zaktualizowany pomyślnie!");
      } catch (error) {
        console.error("Błąd podczas aktualizacji danych pracodawcy:", error);
        alert("Wystąpił błąd podczas aktualizacji profilu.");
      }
    };

    onMounted(fetchStudentProfile);

    return {
      fetchedProfile,
      formProfile,
      updateProfile,
    };
  },
};
</script>

<style scoped>
body {
  background-color: #121212;
  color: #e0e0e0;
}
</style>
