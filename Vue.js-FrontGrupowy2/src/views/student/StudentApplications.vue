<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const applications = ref([]);
const statusFilter = ref("all"); 

const fetchApplications = async () => {
    try {
        const response = await api.getApplicationsByStudentFiltered({ status: statusFilter.value });
        applications.value = response.data.applications || [];
    } catch (err) {
        console.error("Błąd podczas pobierania aplikacji", err);
    }
};

const statusClass = (status) => {
    switch (status) {
        case 'pending':
            return 'text-yellow-400';
        case 'accepted':
            return 'text-green-400';
        case 'rejected':
            return 'text-red-400';
        default:
            return 'text-gray-400';
    }
};

onMounted(() => {
    fetchApplications();
});

const filterApplications = () => {
    fetchApplications();
};

</script>

<template>
    <div class="p-8 bg-gray-900 text-white min-h-screen">
        <h2 class="text-2xl font-bold text-blue-400 mb-6">Twoje aplikacje</h2>

        <div class="mb-6 flex gap-4">
            <select
                v-model="statusFilter"
                @change="filterApplications"
                class="p-2 rounded border border-gray-700 bg-gray-700 text-white w-64">
                <option value="all">Wszystkie</option>
                <option value="pending">Oczekujące</option>
                <option value="accepted">Zaakceptowane</option>
                <option value="rejected">Odrzucone</option>
            </select>
        </div>

        <div v-if="applications.length > 0" class="flex flex-col gap-6">
            <div v-for="application in applications" :key="application.id"
                class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="text-xl font-bold text-blue-400 mb-2">
                            Oferta: {{ application.offer.title }}
                        </h4>
                        <p class="text-sm text-gray-400 mb-2">
                            Status: <span :class="statusClass(application.status)">{{ application.status }}</span>
                        </p>
                        <p class="text-sm text-gray-400">
                            {{ application.offer.description.length > 150 ? application.offer.description.slice(0, 150) + '...' : application.offer.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

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
