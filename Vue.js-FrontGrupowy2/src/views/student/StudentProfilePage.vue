<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Profil Studenta</h2>
    <div v-if="isLoading" class="flex justify-center items-center mb-10">
      <div class="loader"></div>
    </div>
    <div v-else>
      <div class="mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-gray-300">Twoje Dane</h3>
        <p class="text-lg mb-2"><strong>Imię:</strong> {{ fetchedProfile.name }}</p>
        <p class="text-lg mb-2"><strong>Nazwisko:</strong> {{ fetchedProfile.surname }}</p>
        <p class="text-lg mb-2"><strong>Numer indeksu:</strong> {{ fetchedProfile.indexnumber }}</p>
        <p class="text-lg"><strong>Opis:</strong> {{ fetchedProfile.description }}</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-gray-300">Zaktualizuj Dane</h3>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium mb-2">Imię</label>
            <input
              v-model="formProfile.name"
              type="text"
              id="name"
              class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div class="mb-4">
            <label for="surname" class="block text-sm font-medium mb-2">Nazwisko</label>
            <input
              v-model="formProfile.surname"
              type="text"
              id="surname"
              class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div class="mb-4">
            <label for="indexnumber" class="block text-sm font-medium mb-2">Numer indeksu</label>
            <input
              v-model="formProfile.indexnumber"
              type="text"
              id="indexnumber"
              class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>
          <div class="mb-6">
            <label for="description" class="block text-sm font-medium mb-2">Opis</label>
            <textarea
              v-model="formProfile.description"
              id="description"
              class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="p-3 w-full bg-indigo-600 rounded hover:bg-indigo-700 text-white font-semibold transition-all flex justify-center items-center"
          >
            <span v-if="isSubmitting" class="loader-button mr-2"></span>
            {{ isSubmitting ? "Zapisywanie..." : "Zapisz Zmiany" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import api from "@/services/api";

export default {
  name: "StudentProfile",
  setup() {
    const fetchedProfile = reactive({
      name: "",
      surname: "",
      indexnumber: "",
      description: "",
    });

    const formProfile = reactive({
      name: "",
      surname: "",
      indexnumber: "",
      description: "",
    });

    const isLoading = ref(true);
    const isSubmitting = ref(false);

    const fetchStudentProfile = async () => {
      try {
        const response = await api.getUser();
        const data = response.data.user.data;

        fetchedProfile.name = data.name || "";
        fetchedProfile.surname = data.surname || "";
        fetchedProfile.indexnumber = data.indexnumber || "";
        fetchedProfile.description = data.description || "";

        formProfile.name = fetchedProfile.name;
        formProfile.surname = fetchedProfile.surname;
        formProfile.indexnumber = fetchedProfile.indexnumber;
        formProfile.description = fetchedProfile.description;
      } catch (error) {
        console.error("Błąd podczas pobierania danych studenta:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const updateProfile = async () => {
      isSubmitting.value = true;
      try {
        await api.UpdateUser({
          name: formProfile.name,
          surname: formProfile.surname,
          indexnumber: formProfile.indexnumber,
          description: formProfile.description,
        });
        await fetchStudentProfile();
        alert("Profil został zaktualizowany pomyślnie!");
      } catch (error) {
        console.error("Błąd podczas aktualizacji danych studenta:", error);
        alert("Wystąpił błąd podczas aktualizacji profilu.");
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(fetchStudentProfile);

    return {
      fetchedProfile,
      formProfile,
      isLoading,
      isSubmitting,
      updateProfile,
    };
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

input:focus,
textarea:focus {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
  outline: none;
}

h2,
h3 {
  color: #a5b4fc;
}
</style>
