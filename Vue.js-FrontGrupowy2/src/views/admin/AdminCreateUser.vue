<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Tworzenie Konta Użytkownika</h2>
    <p class="text-lg mb-8 text-center text-gray-300">
      Wprowadź dane, aby utworzyć nowe konto administratora lub pracownika Career Office.
    </p>
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium mb-2">Hasło</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <div class="mb-4">
          <label for="role" class="block text-sm font-medium mb-2">Rola</label>
          <select
            v-model="form.role_id"
            id="role"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          >
            <option value="" disabled selected>Wybierz rolę</option>
            <option value="3">Career Office</option>
            <option value="4">Administrator</option>
          </select>
        </div>

        <div v-if="form.role_id == 3" class="mb-4">
          <label for="university" class="block text-sm font-medium mb-2">Uniwersytet</label>
          <input
            v-model="form.university"
            type="text"
            id="university"
            class="p-3 w-full bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          class="p-3 w-full bg-green-600 rounded hover:bg-green-700 text-white font-semibold transition-all flex justify-center items-center"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="loader-button mr-2"></span>
          {{ isSubmitting ? "Tworzenie konta..." : "Utwórz Konto" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { apiClient } from "@/services/api";

export default {
  name: "AdminCreateUser",
  data() {
    return {
      form: {
        email: "",
        password: "",
        role_id: "",
        university: "",
      },
      isSubmitting: ref(false),
    };
  },
  methods: {
    async registerUser() {
      this.isSubmitting = true;
      try {
        const payload = {
          email: this.form.email,
          password: this.form.password,
          role_id: this.form.role_id,
        };

        if (this.form.role_id === "3") {
          payload.university = this.form.university;
        }

        await apiClient.post("/admin/register", payload);

        alert("Konto zostało utworzone pomyślnie!");
        this.resetForm();
      } catch (error) {
        console.error("Błąd podczas tworzenia konta użytkownika:", error);
        alert("Wystąpił błąd podczas tworzenia konta użytkownika.");
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.form = {
        email: "",
        password: "",
        role_id: "",
        university: "",
      };
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

input:focus,
select:focus {
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
  outline: none;
}

h2 {
  color: #a5b4fc;
}
</style>
