<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
import MainSearch from '../components/MainSearch.vue'
import { apiClient } from '@/services/api';
</script>

<template class=" w-screen h-full ">
    <div>
        <!-- <Header></Header> -->
        <div class="flex items-center justify-center py-20 ">
            <div class="_imain w-3/5 flex items-center justify-center bg-gray-500 border rounded-xl">
                <div class="flex flex-col gap-y-3 px-3 py-3 ">
                    <div v-for="(cat, i) in questions" :key="`cat_${i}`" class="bg-gray-800 pb-6 border rounded-xl">
                        <div class="px-6 flex">
                            <div>
                                <div class="_name flex-1 py-6 ">
                                    <div class="text-20 text-center w-full">{{ cat.companyname }}</div>

                                </div>
                                <div class="_about">
                                    <div class="_role text-20 --font-secondary">
                                        {{ cat.krsnumber }}
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        Zatwierdzony: {{ cat.verified }}
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        Data utworzenia: {{ cat.created_at }}
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        Data utworzenia: {{ cat.id }}
                                    </div>
                                </div>
                            </div>
                            <div class="pl-6 pt-6 flex flex-col items-center justify-around ">
                                <div class="border rounded-xl w-12 text-center h-6 bg-green-500"
                                    @click="verifyEmployer(cat.id)">
                                    Tak
                                </div>
                                <div class="border rounded-xl w-12 text-center h-6 bg-red-800"
                                    @click="addToBlacklist(cat.id)">Usuń</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        Header
    },
    data() {
        return {
            questions: []
        };
    },
    methods: {
        async asyncData() {
            try {
                let response = await apiClient.get(`/admin/employers`);
                this.questions = response.data.data;
                this.asyncData();
            } catch (err) {
                console.error('Bład', err);
            }
        },
        async addToBlacklist(userId) {
            try {
                await apiClient.post(`/admin/blacklist/${userId}`);
                console.log(`Blacklist ${userId}`);
                this.questions = this.questions.filter(cat => cat.id !== userId);
                this.asyncData();
            } catch (err) {
                console.error('Bład', err);
            }
        },
        async verifyEmployer(employerId) {
            try {
                await apiClient.patch(`/admin/employers/${employerId}`, {
                    verified: 1
                });
                console.log(`Employer ${employerId} verified`);
                this.asyncData();
            } catch (err) {
                console.error('Błąd podczas weryfikacji pracodawcy', err);
            }
        }

    },
    mounted() {
        this.asyncData();
    },
}
</script>

<style>
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}
</style>
