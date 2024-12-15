<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <h2 class="text-3xl font-bold mb-8 text-center text-indigo-400">Lista Użytkowników</h2>
    <p class="text-lg mb-8 text-center text-gray-300">
      Zarządzaj użytkownikami aplikacji. Możesz banować i odbanowywać użytkowników.
    </p>

    <div v-if="isInitialLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else>
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h3 class="text-xl font-semibold text-gray-300 mb-4">Filtruj użytkowników</h3>
        <div class="flex flex-wrap justify-start gap-6">
          <div class="flex items-center gap-4">
            <label for="roleFilter" class="text-sm font-medium text-gray-300">Rola:</label>
            <select
              id="roleFilter"
              v-model="selectedRole"
              class="p-2 bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="" selected>Wszystkie</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
            </select>
          </div>

          <div class="flex items-center gap-4">
            <label for="nameFilter" class="text-sm font-medium text-gray-300">Email:</label>
            <input
              id="nameFilter"
              v-model="searchQuery"
              type="text"
              placeholder="Wpisz email..."
              class="p-2 bg-gray-700 rounded focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </div>
      </div>

      <div v-if="filteredUsers.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="user in filteredUsers" :key="user.id" class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-indigo-400 mb-4">{{ user.email }}</h3>
          <p class="text-gray-300 mb-2">
            <strong>Rola:</strong> {{ mapRoleId(user.role_id) }}
          </p>
          <p class="text-gray-300 mb-4">
            <strong>Data utworzenia:</strong> {{ formatDate(user.created_at) }}
          </p>

          <p v-if="user.blacklist" class="text-red-400 font-bold mb-4">Użytkownik jest zbanowany</p>

          <div class="flex gap-4">
            <button
              v-if="user.role_id !== 4 && !user.blacklist"
              @click="banUser(user.id)"
              class="p-3 bg-red-600 rounded hover:bg-red-700 text-white w-full flex justify-center items-center"
              :disabled="isSubmitting.ban[user.id]"
            >
              <span v-if="isSubmitting.ban[user.id]" class="loader-button mr-2"></span>
              {{ isSubmitting.ban[user.id] ? "Banuję..." : "Zbanuj" }}
            </button>
            <button
              v-if="user.role_id !== 4 && user.blacklist"
              @click="unbanUser(user.id)"
              class="p-3 bg-green-600 rounded hover:bg-green-700 text-white w-full flex justify-center items-center"
              :disabled="isSubmitting.unban[user.id]"
            >
              <span v-if="isSubmitting.unban[user.id]" class="loader-button mr-2"></span>
              {{ isSubmitting.unban[user.id] ? "Odbanuję..." : "Odbanuj" }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-400">
        <p>Brak użytkowników do wyświetlenia.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { apiClient } from "@/services/api";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      selectedRole: "",
      searchQuery: "",
      roles: [
        { id: 1, name: "Student" },
        { id: 2, name: "Employer" },
        { id: 3, name: "Career Office" },
        { id: 4, name: "Administrator" },
      ],
      isInitialLoading: true,
      isSubmitting: reactive({
        ban: {},
        unban: {},
      }),
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const matchesRole = this.selectedRole ? user.role_id === parseInt(this.selectedRole) : true;
        const matchesName = this.searchQuery
          ? user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;
        return matchesRole && matchesName;
      });
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get("/admin/users");
        this.users = response.data;
      } catch (error) {
        console.error("Błąd podczas pobierania listy użytkowników:", error);
      } finally {
        this.isInitialLoading = false;
      }
    },
    mapRoleId(roleId) {
      switch (roleId) {
        case 1:
          return "Student";
        case 2:
          return "Employer";
        case 3:
          return "Career Office";
        case 4:
          return "Administrator";
        default:
          return "Nieznana rola";
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("pl-PL", options);
    },
    async banUser(userId) {
      this.isSubmitting.ban[userId] = true;
      try {
        await apiClient.post(`/admin/blacklist/${userId}`);
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) this.users[userIndex].blacklist = { user_id: userId };
      } catch (error) {
        console.error("Błąd podczas banowania użytkownika:", error);
      } finally {
        this.isSubmitting.ban[userId] = false;
      }
    },
    async unbanUser(userId) {
      this.isSubmitting.unban[userId] = true;
      try {
        await apiClient.delete(`/admin/blacklist/${userId}`);
        const userIndex = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) this.users[userIndex].blacklist = null;
      } catch (error) {
        console.error("Błąd podczas odbanowywania użytkownika:", error);
      } finally {
        this.isSubmitting.unban[userId] = false;
      }
    },
  },
  mounted() {
    this.fetchUsers();
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

h2 {
  color: #a5b4fc;
}
</style>
