<template>
  <div
    class="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white p-6 flex items-center justify-between shadow-lg">
    <!-- User Information -->
    <div class="flex items-center space-x-4">
      <div>
        <p class="text-lg font-semibold">{{ employerName }}</p>
        <p class="text-sm text-gray-400">Pracodawca</p>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from '@/services/api'

export default {
  name: "EmployerHeader",
  setup() {
    // Deklaracja zmiennej reaktywnej
    const employerName = ref('')

    // Funkcja pobierająca dane employera
    const fetchEmployerName = async () => {
      try {
        const response = await api.getUser();
        console.log('Response data:', response.data)

        // Aktualizacja reaktywnej zmiennej
        employerName.value = response.data.user?.data?.name || response.data.user?.email || 'Nieznane imię'
        console.log('Employer name:', employerName.value)
      } catch (err) {
        console.error('Błąd podczas pobierania danych użytkownika', err)
      }
    }

    // Wywołanie funkcji podczas montowania komponentu
    onMounted(() => {
      fetchEmployerName()
    })

    // Eksport zmiennych i funkcji dla template
    return {
      employerName,
    }
  }
}
</script>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #1f2937, #2d3748, #1f2937);
}
</style>