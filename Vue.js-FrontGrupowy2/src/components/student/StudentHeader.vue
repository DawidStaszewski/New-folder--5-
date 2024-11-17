<template>
  <div
    class="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white p-6 flex items-center justify-between shadow-lg">
    <!-- User Information -->
    <div class="flex items-center space-x-4">
      <div>
        <p class="text-lg font-semibold">{{ studentName }}</p>
        <p class="text-sm text-gray-400">Student</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from '@/services/api'

export default {
  name: "StudentHeader",
  setup() {
    // Deklaracja zmiennej reaktywnej
    const studentName = ref('')

    // Funkcja pobierająca dane studenta
    const fetchStudentName = async () => {
      try {
        const response = await api.getUser();
        console.log('Response data:', response.data)

        // Aktualizacja reaktywnej zmiennej
        studentName.value = response.data.user?.data?.name || response.data.user?.email || 'Nieznane imię'
        console.log('Student name:', studentName.value)
      } catch (err) {
        console.error('Błąd podczas pobierania danych użytkownika', err)
      }
    }

    // Wywołanie funkcji podczas montowania komponentu
    onMounted(() => {
      fetchStudentName()
    })

    // Eksport zmiennych i funkcji dla template
    return {
      studentName,
    }
  }
}
</script>

<style scoped>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #1f2937, #2d3748, #1f2937);
}
</style>
