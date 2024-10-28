<template>
    <div class="p-8">
      <h2 class="text-xl font-bold mb-4">Uzupełnij Profil</h2>
      <form @submit.prevent="saveProfile">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-2">Imię i Nazwisko</label>
          <input v-model="profile.name" type="text" id="name" class="p-2 w-full bg-gray-700 rounded" required />
        </div>
        <div class="mb-4">
          <label for="skills" class="block text-sm font-medium mb-2">Umiejętności</label>
          <input v-model="profile.skills" type="text" id="skills" class="p-2 w-full bg-gray-700 rounded" required />
        </div>
        <button type="submit" class="p-2 bg-indigo-600 rounded hover:bg-indigo-700">Zapisz Profil</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profile: {
          name: "",
          skills: "",
        },
      };
    },
    methods: {
      saveProfile() {
        console.log("Saving profile: ", this.profile);
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #121212;
    color: #e0e0e0;
  }
  </style>