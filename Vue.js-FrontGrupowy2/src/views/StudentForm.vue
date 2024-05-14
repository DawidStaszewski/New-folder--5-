<script setup>
import Header from '../components/Header.vue'
import MainSearch from '../components/MainSearch.vue'
import axios from 'axios';
</script>


<template class=" w-screen h-full ">
    <div class="">
        <Header></Header>

        <div class="pt-16 px-72 ">
            <section class="text-left pl-8 text-28">Search bar?</section>
            <MainSearch class=""></MainSearch>
        </div>

        <div class="_main px-72 gap-x-3 pb-6 flex justify-center">

            <div class="_imainl bg-gray-600 border rounded-xl m-h-full">
                <div class="py-3 px-3">Jakiś text tu będzie menu?</div>
                <div class="flex flex-col  gap-y-3 px-3 py-3">
                    <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Mój Profil</div>
                    <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Przeglądaj materiały
                        edukacyjne
                    </div>
                    <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Quizz</div>
                    <div class="_menuItem rounded bg-gray-800 w-full h-full flex justify-center">Ustawienia</div>
                </div>
            </div>


            <div class="_imainr bg-gray-600 border rounded-xl pb-4">
                <div class="flex flex-col justify-evenly px-6 pt-8 h-full">
                    <div class="flex justify-start flex-wrap gap-x-2 pb-16">
                        <div class="bg-gray-800">
                            <div><img :src="imagesrc" class="w-64 h-64" alt="" /></div>
                        </div>
                        <div class="flex flex-col justify-between">
                            <div class="px-16 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                                Pobrane skądś imie i nazwisko
                            </div>
                            <div class="px-16 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                                Wczytaj CV
                            </div>
                            <div class="px-16 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                                Nazwa Uczelni też skądś pobrana
                            </div>
                        </div>
                        <div class="px-16 block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
                            Status Studenta
                        </div>
                    </div>


                    <div class="flex justify-start  gap-x-2">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud
                        exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum."
                    </div>
                    <div class="flex justify-center pt-24 gap-x-2">"Troche nie wiem co tu dodać XD
                    </div>
                    <div class="sm:text-xs font-thin">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji
                        procesu
                        rekrutacji
                        (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz.
                        1000) oraz
                        zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016
                        r. w sprawie
                        ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego
                        przepływu takich
                        danych oraz uchylenia dyrektywy 95/46/WE (RODO).
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import image from "@/assets/img/1.png"
export default {
    components: {
        Header
    },
    data() {
        return {
            questions: [],
            imagesrc: image
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
    height: 80vh;
    display: grid;
    grid-template-columns: 30% 70%;
}
</style>
