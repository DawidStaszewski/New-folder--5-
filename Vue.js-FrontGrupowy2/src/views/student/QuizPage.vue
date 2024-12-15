<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Quiz Predyspozycji</h2>
    <p class="mb-4">Rozpocznij quiz, aby dowiedzieć się, jakie dziedziny informatyki pasują do Twoich zainteresowań i umiejętności!</p>
    <button @click="startQuiz" class="p-2 bg-indigo-600 rounded hover:bg-indigo-700">Rozpocznij Quiz</button>

    <!-- Wyświetlanie wyników -->
    <div v-if="quizResults" class="mt-8">
      <h3 class="text-lg font-bold mb-4">Wyniki Quizu</h3>
      <div v-for="(points, path) in quizResults.points" :key="path" class="mb-2">
        <strong>{{ path }}:</strong> {{ points }}
      </div>
      <p><strong>Preferowana ścieżka:</strong> {{ quizResults.dominant_path }}</p>
    </div>

    <!-- Jeśli brak wyników, wyświetl informację -->
    <div v-else class="mt-8">
      <p>Brak wyników dla tego studenta.</p>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'; // Importujemy apiClient

export default {
  data() {
    return {
      studentId: null, // Przechowujemy ID studenta
      quizResults: null, // Przechowujemy wyniki quizu
    };
  },
  mounted() {
    this.fetchStudentProfile(); // Wywołanie funkcji pobierającej dane studenta po załadowaniu komponentu
  },
  methods: {
    // Funkcja do pobierania danych studenta
    async fetchStudentProfile() {
      try {
        const response = await api.getUser(); // Pobranie danych studenta
        console.log('Response data:', response.data);

        // Zakładając, że studentId znajduje się w response.data.user.data.id
        this.studentId = response.data.user?.data?.id || null;
        console.log('Student ID:', this.studentId);

        // Jeśli StudentId jest dostępne, wykonaj zapytanie GET do API, aby pobrać wyniki quizu
        if (this.studentId) {
          this.fetchQuizResults(this.studentId);
        }
      } catch (err) {
        console.error('Błąd podczas pobierania danych użytkownika', err);
      }
    },

    // Funkcja do pobierania wyników quizu
    async fetchQuizResults(studentId) {
      try {
        // Wykonaj zapytanie GET, aby pobrać wyniki quizu
        const response = await api.getQuizResults(studentId);
        
        // Sprawdzamy, czy dane są dostępne
        if (response.data && response.data.data) {
          this.quizResults = response.data.data; // Przypisujemy wyniki quizu do zmiennej
          console.log('Wyniki quizu:', this.quizResults);

          // Jeśli chcesz, możesz również wyświetlić szczegóły w konsoli:
          const { points, dominant_path } = this.quizResults;
          console.log('Punkty:', points);
          console.log('Preferowana ścieżka:', dominant_path);
        } else {
          console.log('Brak wyników dla tego studenta.');
        }
      } catch (error) {
        console.error("Błąd podczas pobierania wyników quizu:", error);
      }
    },

    // Funkcja do obsługi rozpoczęcia quizu
    startQuiz() {
      this.$router.push({ name: "QuizPageTest" }); // Przekierowanie do strony quizu
    },
  },
};
</script>
