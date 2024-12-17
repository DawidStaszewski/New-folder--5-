<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const applications = ref([]);
const statusFilter = ref("all"); // New ref for filtering

// Function to fetch applications from the API with a status filter
const fetchApplications = async () => {
    try {
        // Pass the 'status' filter as a query parameter
        const response = await api.getApplicationsByEmployerFiltered({ status: statusFilter.value });
        applications.value = response.data.applications || [];
    } catch (err) {
        console.error("Błąd podczas pobierania aplikacji", err);
    }
};


// Helper to return status class
const statusClass = (status) => {
    switch (status) {
        case 'pending':
            return 'text-yellow-400';
        case 'approved':
            return 'text-green-400';
        case 'rejected':
            return 'text-red-400';
        default:
            return 'text-gray-400';
    }
};

// Initialize the data
onMounted(() => {
    fetchApplications();
});

// Accept application function
const acceptApplication = async (applicationId) => {
    try {
        const response = await api.acceptApplication(applicationId);
        alert(response.data.message);
        fetchApplications(); // Re-fetch applications
    } catch (error) {
        console.error("Błąd podczas akceptacji aplikacji", error);
        alert("Wystąpił błąd podczas akceptacji aplikacji.");
    }
};

// Reject application function
const rejectApplication = async (applicationId) => {
    try {
        const response = await api.rejectApplication(applicationId);
        alert(response.data.message);
        fetchApplications(); // Re-fetch applications
    } catch (error) {
        console.error("Błąd podczas odrzucania aplikacji", error);
        alert("Wystąpił błąd podczas odrzucania aplikacji.");
    }
};

// Watch for changes in the filter and re-fetch applications
const filterApplications = () => {
    fetchApplications();
};
</script>

<template>
    <div class="p-8 bg-gray-900 text-white min-h-screen">
        <!-- Tytuł strony -->
        <h2 class="text-2xl font-bold text-blue-400 mb-6">Rozpatrz aplikacje</h2>

        <!-- Filtry -->
        <div class="mb-6 flex gap-4">
            <select
                v-model="statusFilter"
                @change="filterApplications"
                class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-64">
                <option value="all">Wszystkie</option>
                <option value="pending">Oczekujące</option>
                <option value="approved">Zaakceptowane</option>
                <option value="rejected">Odrzucone</option>
            </select>
        </div>

        <!-- Lista aplikacji -->
        <div v-if="applications.length > 0" class="flex flex-col gap-6">
            <div v-for="application in applications" :key="application.id"
                class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-xl font-bold text-blue-400 mb-2">
                            Aplikacja od: {{ application.student.name }} {{ application.student.surname }}
                        </h4>
                        <p class="text-sm text-gray-400 mb-2">
                            Status: <span :class="statusClass(application.status)">{{ application.status }}</span>
                        </p>
                        <p class="text-sm text-gray-400">{{ application.offer.title }}</p>
                        <p class="text-sm text-gray-400">
                            {{ application.offer.description.length > 150 ? application.offer.description.slice(0, 150) + '...' : application.offer.description }}
                        </p>
                        <button
                            @click="downloadCv(application.cv)" 
                            style="background-color: #60A5FA; color: white; margin-top: 5px; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease;">
                            Pobierz CV
                        </button>
                    </div>
                    <div class="flex gap-4">
                        <!-- Accept button (green) -->
                        <button 
                            @click="acceptApplication(application.id)" 
                            class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                            Akceptuj
                        </button>
                        <!-- Reject button (red) -->
                        <button 
                            @click="rejectApplication(application.id)" 
                            class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
                            Odrzuć
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Komunikat pustego stanu -->
        <div v-else class="text-center">
            <p class="text-gray-500 text-lg">Brak aplikacji.</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}
</style>
