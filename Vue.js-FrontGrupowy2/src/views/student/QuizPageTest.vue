<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Quiz Predyspozycji</h2>
    <p class="mb-4">Odpowiedz na wszystkie pytania, aby poznać swoje predyspozycje!</p>

    <form @submit.prevent="submitQuiz">
      <!-- Pytania wielokrotnego wyboru -->
      <div v-for="(question, index) in questions" :key="index" class="mb-6">
        <h3 class="font-semibold mb-2">{{ index + 1 }}. {{ question.text }}</h3>
        <div>
          <label
            v-for="(answer, answerIndex) in question.answers"
            :key="answerIndex"
            class="block"
          >
            <input
              type="radio"
              :name="'question-' + index"
              :value="answer.value"
              v-model="answers[index]"
              class="mr-2"
            />
            {{ answer.text }}
          </label>
        </div>
      </div>

      <button type="submit" class="p-2 bg-indigo-600 rounded hover:bg-indigo-700">
        Zakończ Quiz
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import api from "@/services/api"; 


export default {
  data() {
    return {
      questions: [
        {
          text: "Co najbardziej lubisz robić podczas pracy nad projektem?",
          answers: [
            { text: "Tworzyć intuicyjne i atrakcyjne interfejsy.", value: "A" },
            { text: "Projektować logikę aplikacji i zarządzać bazami danych.", value: "B" },
            { text: "Analizować dane i szukać ukrytych wzorców.", value: "C" },
            { text: "Dbać o stabilność systemów i ich konfigurację.", value: "D" },
            { text: "Testować i zabezpieczać systemy przed zagrożeniami.", value: "E" },
          ],
        },
        {
          text: "Które z tych technologii najbardziej Cię interesują?",
          answers: [
            { text: "HTML, CSS, JavaScript", value: "A" },
            { text: "Python, Node.js", value: "B" },
            { text: "SQL, Tableau", value: "C" },
            { text: "Docker, Linux", value: "D" },
            { text: "Wireshark, Kali Linux", value: "E" },
          ],
        },
        {
          text: "Jakie cechy najlepiej Cię opisują?",
          answers: [
            { text: "Kreatywny i wizualny myśliciel.", value: "A" },
            { text: "Logiczny i skupiony na algorytmach.", value: "B" },
            { text: "Analityczny i zorientowany na detale.", value: "C" },
            { text: "Skupiony na stabilności i niezawodności.", value: "D" },
            { text: "Ostrożny i skoncentrowany na bezpieczeństwie.", value: "E" },
          ],
        },
        {
          text: "Jaki typ projektu najbardziej Cię interesuje?",
          answers: [
            { text: "Tworzenie aplikacji mobilnych lub webowych z atrakcyjnym designem.", value: "A" },
            { text: "Budowanie API i systemów przetwarzania danych.", value: "B" },
            { text: "Analiza danych z dużych zbiorów.", value: "C" },
            { text: "Automatyzacja procesów w chmurze.", value: "D" },
            { text: "Testowanie podatności systemów.", value: "E" },
          ],
        },
        {
          text: "Jakie narzędzia najchętniej wykorzystujesz?",
          answers: [
            { text: "Figma, Adobe XD", value: "A" },
            { text: "Django, Spring Boot", value: "B" },
            { text: "Jupyter Notebook, R", value: "C" },
            { text: "Ansible, Jenkins", value: "D" },
            { text: "Nessus, OpenVAS", value: "E" },
          ],
        },
        {
          text: "Które zagadnienia teoretyczne Cię interesują?",
          answers: [
            { text: "UX/UI Design", value: "A" },
            { text: "Algorytmy i struktury danych", value: "B" },
            { text: "Statystyka i analiza danych", value: "C" },
            { text: "Sieci komputerowe", value: "D" },
            { text: "Kryptografia", value: "E" },
          ],
        },
        {
          text: "W jakim środowisku chciałbyś pracować?",
          answers: [
            { text: "Kreatywnym, skupionym na wizualnym designie.", value: "A" },
            { text: "Technicznym, z wyzwaniami logicznymi.", value: "B" },
            { text: "Analizującym dane w dużych zespołach.", value: "C" },
            { text: "Stabilnym, z naciskiem na niezawodność.", value: "D" },
            { text: "Dynamicznym, reagującym na zagrożenia.", value: "E" },
          ],
        },
        {
          text: "Co motywuje Cię do działania?",
          answers: [
            { text: "Tworzenie rzeczy, które są atrakcyjne wizualnie.", value: "A" },
            { text: "Rozwiązywanie złożonych problemów.", value: "B" },
            { text: "Odkrywanie ukrytych wzorców w danych.", value: "C" },
            { text: "Zapewnianie stabilności systemów.", value: "D" },
            { text: "Ochrona danych i systemów.", value: "E" },
          ],
        },
        {
          text: "Które z poniższych wyzwań Cię interesują?",
          answers: [
            { text: "Tworzenie responsywnych interfejsów.", value: "A" },
            { text: "Optymalizacja zapytań do bazy danych.", value: "B" },
            { text: "Tworzenie raportów na podstawie danych.", value: "C" },
            { text: "Utrzymanie systemów w wysokiej dostępności.", value: "D" },
            { text: "Wykrywanie i eliminowanie zagrożeń.", value: "E" },
          ],
        },
        {
          text: "Jakie masz doświadczenie z programowaniem?",
          answers: [
            { text: "Frontendowe (HTML, CSS, JS).", value: "A" },
            { text: "Backendowe (Python, Java).", value: "B" },
            { text: "Analiza danych (SQL, R).", value: "C" },
            { text: "Automatyzacja (Bash, PowerShell).", value: "D" },
            { text: "Bezpieczeństwo (C, ASM).", value: "E" },
          ],
        },
        // Pytania Prawda/False
        {
          text: "Interesuje mnie projektowanie stron internetowych.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Lubię analizować dane i szukać w nich ukrytych wzorców.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Często zastanawiam się, jak poprawić bezpieczeństwo systemów.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Lubię pracować z użytkownikami końcowymi, aby dostosować interfejs do ich potrzeb.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Interesuje mnie praca z bazami danych.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Zależy mi na utrzymaniu stabilności i niezawodności systemów.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Lubię testować podatności aplikacji i systemów.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Interesuje mnie optymalizacja wydajności aplikacji.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Często zastanawiam się nad designem aplikacji, które używam.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Chciałbym nauczyć się więcej o przetwarzaniu danych w chmurze.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Czy lubisz pracować z dużymi zbiorami danych?",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Chciałbym tworzyć atrakcyjne wizualizacje danych.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Bezpieczeństwo aplikacji to dla mnie priorytet.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Zależy mi na tworzeniu aplikacji z wysoką wydajnością.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Lubię projektować architekturę aplikacji.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Interesuje mnie analiza logów systemowych.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Czy wolisz pracę kreatywną nad wizualną stroną projektów?",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Lubisz pisać skrypty automatyzujące?",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Ciekawią mnie zagadnienia związane z kryptografią.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
        {
          text: "Chciałbym tworzyć aplikacje mobilne.",
          answers: [
            { text: "Prawda", value: "Prawda" },
            { text: "False", value: "False" },
          ],
        },
      ],
      answers: Array(30).fill(null),
      studentId: null, 
    };
  },
 mounted() {
    // Wywołanie funkcji pobierającej dane studenta po załadowaniu komponentu
    this.fetchStudentProfile();
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
      } catch (err) {
        console.error('Błąd podczas pobierania danych użytkownika', err);
      }
    },

    // Funkcja do obsługi wysyłania quizu
    async submitQuiz() {
      console.log(this.answers);
      console.log("Student ID:", this.studentId);

      // Upewnij się, że studentId i odpowiedzi są dostępne
      if (!this.studentId || this.answers.includes(undefined)) {
        alert("Proszę odpowiedzieć na wszystkie pytania.");
        return;
      }

      // Przygotowanie danych do wysłania
      const data = {
        student_id: this.studentId,
        answers: this.answers,
      };

      try {
        // Wysyłanie wyników quizu
        await api.submitQuizResults(data);
        alert('Wyniki zostały wysłane pomyślnie!');
        this.$router.push({ name: "QuizPage" });
      } catch (error) {
        console.error("Błąd podczas wysyłania wyników:", error);
        alert('Wystąpił błąd podczas wysyłania wyników.');
      }
    },
  },
};
</script>