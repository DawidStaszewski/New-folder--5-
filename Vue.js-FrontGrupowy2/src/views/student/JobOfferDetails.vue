<template>
  <div class="p-8 bg-gray-900 text-white min-h-screen">
    <button
      @click="goBack"
      class="mb-6 p-3 bg-blue-600 rounded hover:bg-blue-700 text-white transition-colors"
    >
      Powrót do listy ofert
    </button>
    <h2 class="text-2xl font-bold mb-10 text-center">Szczegóły Oferty Pracy</h2>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <div v-else-if="jobOffer" class="bg-gray-800 p-6 rounded-lg shadow-lg divide-y divide-gray-700">
      <div class="pb-6">
        <h3 class="text-3xl font-bold mb-4 text-blue-400">{{ jobOffer.title }}</h3>
        <p class="text-gray-400 text-sm">Wygasa: {{ formatDate(jobOffer.expiration_date) }}</p>
      </div>

      <div class="py-6">
        <h4 class="text-lg font-semibold text-gray-300 mb-2">Opis oferty:</h4>
        <p class="text-gray-300 leading-relaxed" v-html="formattedDescription"></p>
      </div>

      <div class="py-6">
        <h4 class="text-lg font-semibold text-gray-300 mb-4">Wymagane kompetencje:</h4>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="competence in jobOffer.competences"
            :key="competence.id"
            class="inline-block bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
          >
            {{ competence.name }}
          </span>
        </div>
      </div>

      <div class="py-6">
        <h4 class="text-lg font-semibold text-gray-300 mb-4">Dane pracodawcy:</h4>
        <p><strong class="text-gray-400">Nazwa:</strong> {{ jobOffer.employer.companyname }}</p>
        <p><strong class="text-gray-400">KRS:</strong> {{ jobOffer.employer.krsnumber }}</p>
        <p v-if="jobOffer.employer.verified === '1'" class="text-green-400 font-semibold">
          (Zweryfikowany pracodawca)
        </p>
        <p v-if="jobOffer.employer.user && jobOffer.employer.user.email" class="mt-2">
          <strong class="text-gray-400">Email:</strong>
          <a :href="`mailto:${jobOffer.employer.user.email}`" class="text-blue-400 underline">
            {{ jobOffer.employer.user.email }}
          </a>
        </p>
      </div>

      <div class="pt-6">
  <h4 class="text-lg font-semibold text-gray-300 mb-4">Złóż zgłoszenie:</h4>
  
  <!-- Check if user has already applied -->
  <div v-if="hasApplied" class="text-green-400 font-semibold text-center">
    Już aplikowałeś na tę ofertę pracy. Powodzenia!
  </div>
  <!-- Application Form -->
  <form v-else @submit.prevent="submitApplication">
    <div class="mb-4">
      <label for="cv" class="block text-gray-400 mb-2">Załącz CV (PDF, max 2MB):</label>
      <input
        type="file"
        id="cv"
        accept=".pdf"
        @change="handleFileUpload"
        class="block w-full text-gray-900 rounded-lg bg-gray-200"
      />
    </div>
    <button
      type="submit"
      class="w-full p-3 bg-green-600 rounded hover:bg-green-700 text-white transition-transform transform"
    >
      Wyślij zgłoszenie
    </button>
  </form>
</div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-400">Brak danych oferty pracy.</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      jobOffer: null,
      isLoading: true,
      selectedFile: null,
      hasApplied: false,
    };
  },
  computed: {
    formattedDescription() {
      if (this.jobOffer && this.jobOffer.description) {
        return this.jobOffer.description.replace(/\n/g, "<br>");
      }
      return "";
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: "JobOffers" });
    },
    async fetchJobOfferDetails() {
      try {
        const response = await api.getJobOfferById(this.$route.params.id);
        this.jobOffer = response.data.offer;
        this.hasApplied = response.data.has_applied;
      } catch (error) {
        console.error("Error fetching job offer details:", error);
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("pl-PL", options);
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async submitApplication() {
      if (!this.selectedFile) {
        alert("Wybierz plik CV przed wysłaniem zgłoszenia.");
        return;
      }

      const formData = new FormData();
      formData.append("offer_id", this.jobOffer.id);
      formData.append("cv", this.selectedFile);

      try {
        const response = await api.applyForJob(formData);
        alert("Zgłoszenie zostało wysłane pomyślnie!");

        this.$router.push("/student/my_applications");
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("Wystąpił problem podczas wysyłania zgłoszenia. Spróbuj ponownie później.");
      }
    },
  },
  mounted() {
    this.fetchJobOfferDetails();
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

button {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #48bb78;
  box-shadow: 0px 8px 15px rgba(72, 187, 120, 0.4);
}

div {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
</style>
