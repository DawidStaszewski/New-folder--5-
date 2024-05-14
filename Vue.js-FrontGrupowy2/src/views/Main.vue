<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import axios from 'axios';
</script>


<template class=" w-screen h-full ">
    <div class="">
        <Header></Header>

        <div class="pt-24 px-72 ">
            <section class="text-left pl-8 text-28">Search bar?</section>
            <MainSearch class=""></MainSearch>
        </div>

        <div class="_main px-72 gap-x-3 pb-6">

            <div class="_imainl bg-gray-500 border rounded-xl">
                <div class="py-3 px-3">Jakiś text tu będzie menu?</div>
                <div class="flex flex-col  gap-y-3 px-3 py-3">
                    <div class="bg-gray-800 w-full h-full flex justify-center" v-for="i in 100" :key="i">
                        <div class=""> {{ i }}</div>
                    </div>
                </div>
            </div>

            <div class="_imainr  flex items-center justify-center bg-gray-500 border rounded-xl">
                <div class="flex flex-col  gap-y-3 px-3 py-3 ">
                    <div v-for="(cat, i) in questions" :key="`cat_${i}`" class="bg-gray-800 pb-6 border rounded-xl">
                        <div class=" px-6 ">
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

<style scoped>
body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

._main {
    display: grid;
    grid-template-columns: 30% 70%;
}
</style>
