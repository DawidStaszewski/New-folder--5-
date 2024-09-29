<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
import MainSearch from '../components/MainSearch.vue'
</script>

<template class=" w-screen h-full ">
    <div>
        <Header></Header>
        <div class="flex items-center justify-center py-20 ">
            <div class="_imain w-3/5 flex items-center justify-center bg-gray-500 border rounded-xl">
                <div class="flex flex-col  gap-y-3 px-3 py-3 ">
                    <div v-for="(cat, i) in questions" :key="`cat_${i}`" class="bg-gray-800 pb-6 border rounded-xl">
                        <div class=" px-6 flex">
                            <div>
                                <div class="_name flex-1 py-6 ">
                                    <div class="text-20 text-center w-full ">{{ cat.displayName }}adadawd</div>
                                </div>
                                <div class="_about">
                                    <div class="_role text-20 --font-secondary">
                                        {{ cat.role?.displayName }}
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        {{ cat.description }}
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        NIP
                                    </div>
                                    <div class="_biography text-5 border-b border-white h-90">
                                        FIRMA
                                    </div>
                                </div>

                            </div>
                            <div class="pl-6 pt-6 flex flex-col items-center justify-around ">
                                <div class="border rounded-xl w-12 text-center h-6 bg-green-500">BAN</div>

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
                let Toster = []


                let response = await axios.get(`https://valorant-api.com/v1/agents`)
                Toster.push(...response.data.data)


                console.log('w111qeqweqweqe')
                console.log(response)
                console.log('wqeqweqweqe')
                console.log(response.data)
                console.log(Toster)
                this.questions = Toster
            } catch (err) {
                console.log(err)
                if (axios.isCancel(error)) {
                    console.log('Aborted')
                } else {
                    error({ statusCode: 500 })
                    return
                }
            }
        },
    },
    mounted() { this.asyncData(); console.log(this.questions) },
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