<template>
    <div class="p-8">
      <h2 class="text-xl font-bold mb-4">Quiz Predyspozycji</h2>
      <p class="mb-4">Rozpocznij quiz, aby dowiedzieć się, jakie dziedziny informatyki pasują do Twoich zainteresowań i umiejętności!</p>
      <button @click="startQuiz" class="p-2 bg-indigo-600 rounded hover:bg-indigo-700">Rozpocznij Quiz</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startQuiz() {
        console.log("Starting quiz...");
      },
    },
  };
  </script>