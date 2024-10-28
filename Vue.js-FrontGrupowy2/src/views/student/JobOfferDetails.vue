<template>
    <div class="p-8">
      <button @click="goBack" class="mb-0 p-2 bg-blue-600 rounded hover:bg-blue-700 text-white">Powrót do listy ofert</button>
      <h2 class="text-2xl font-bold mb-4 text-white text-center pb-10">Szczegóły Oferty Pracy:</h2>
      <div v-if="jobOffer" class="bg-gray-800 p-6 rounded">
        <h3 class="text-xl font-bold mb-2 text-white">{{ jobOffer.title }}</h3>
        <p class="mb-4 " v-html="formattedDescription"></p>
        <button @click="applyForJob" class="p-3 mt-4 bg-green-600 rounded hover:bg-green-700 text-white">Złóż zgłoszenie</button>
      </div>
      <div v-else>
        <p>Wczytywanie szczegółów oferty...</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        jobOffer: null,
      };
    },
    computed: {
      formattedDescription() {
        if (this.jobOffer && this.jobOffer.description) {
          return this.jobOffer.description.replace(/\n/g, '<br>');
        }
        return '';
      }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'JobOffers' });
      },
      async fetchJobOfferDetails() {
        try {
          const response = await api.getJobOfferById(this.$route.params.id);
          this.jobOffer = response.data.data;
        } catch (error) {
          console.error('Error fetching job offer details:', error);
        }
      },
      async applyForJob() {
        try {
          await api.applyForJob(this.jobOffer.id);
          alert('Zgłoszenie zostało wysłane pomyślnie!');
        } catch (error) {
          console.error('Error applying for job:', error);
          alert('Wystąpił problem podczas wysyłania zgłoszenia. Spróbuj ponownie później.');
        }
      },
    },
    mounted() {
      this.fetchJobOfferDetails();
    },
  };
  </script>
  
  <style scoped>
  </style>


