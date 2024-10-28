<template>
    <div class="p-8">
      <h2 class="text-xl font-bold mb-4">Materiały Edukacyjne</h2>
      <p class="mb-4">Znajdź materiały, które pomogą Ci w przygotowaniach do budowy CV, rozmów o pracę, i innych aspektów kariery!</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="material in materials" :key="material.id" class="bg-gray-800 p-4 rounded">
          <h3 class="text-lg font-bold mb-2">{{ material.title }}</h3>
          <p>{{ material.description }}</p>
          <a :href="material.link" target="_blank" class="text-indigo-400 hover:underline">Czytaj więcej</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        materials: [
          { id: 1, title: "Jak napisać dobre CV?", description: "Porady dotyczące tworzenia profesjonalnego CV.", link: "#" },
          { id: 2, title: "Rozmowa kwalifikacyjna", description: "Jak najlepiej przygotować się do rozmowy kwalifikacyjnej?", link: "#" },
        ],
      };
    },
  };
  </script>