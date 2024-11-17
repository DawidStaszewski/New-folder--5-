<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Profil Studenta</h2>
    <div class="mb-6">
      <p class="text-lg"><strong>Imię:</strong> {{ studentProfile.name }}</p>
      <p class="text-lg"><strong>Nazwisko:</strong> {{ studentProfile.surname }}</p>
      <p class="text-lg"><strong>Numer indeksu:</strong> {{ studentProfile.indexNumber }}</p>
      <p class="text-lg"><strong>Opis:</strong> {{ studentProfile.description }}</p>
    </div>

    <h3 class="text-lg font-semibold mb-4">Zaktualizuj Dane</h3>
    <form @submit.prevent="updateProfile">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium mb-2">Imię</label>
        <input v-model="studentProfile.name" type="text" id="name" class="p-2 w-full bg-gray-700 rounded" required />
      </div>

      <div class="mb-4">
        <label for="surname" class="block text-sm font-medium mb-2">Nazwisko</label>
        <input v-model="studentProfile.surname" type="text" id="surname" class="p-2 w-full bg-gray-700 rounded"
          required />
      </div>

      <div class="mb-4">
        <label for="indexNumber" class="block text-sm font-medium mb-2">Numer indeksu</label>
        <input v-model="studentProfile.indexNumber" type="number" id="indexNumber"
          class="p-2 w-full bg-gray-700 rounded" required />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium mb-2">Opis</label>
        <textarea v-model="studentProfile.description" id="description" class="p-2 w-full bg-gray-700 rounded"
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
import axios from "axios";
import api from "@/services/api";

export default {
  name: "StudentHeader",
  setup() {
    const studentProfile = reactive({
      name: "",
      surname: "",
      indexNumber: "",
      description: "",
    });

    const fetchStudentProfile = async () => {
      try {
        const response = await api.getUser();
        const data = response.data.user.data;

        studentProfile.name = data.name || "";
        studentProfile.surname = data.surname || "";
        studentProfile.indexNumber = data.indexNumber || "";
        studentProfile.description = data.description || "";
        console.log("Student profile fetched:", studentProfile);
      } catch (error) {
        console.error("Błąd podczas pobierania danych studenta:", error);
      }
    };

    const updateProfile = async () => {
      try {
        const response = await api.UpdateUser({
          name: studentProfile.name,
          surname: studentProfile.surname,
          indexNumber: studentProfile.indexNumber,
          description: studentProfile.description,
        });
        console.log("Profile updated:", response.data);
        alert("Profil został zaktualizowany pomyślnie!");
      } catch (error) {
        console.error("Błąd podczas aktualizacji danych studenta:", error);
        alert("Wystąpił błąd podczas aktualizacji profilu.");
      }
    };

    onMounted(fetchStudentProfile);

    return {
      studentProfile,
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
