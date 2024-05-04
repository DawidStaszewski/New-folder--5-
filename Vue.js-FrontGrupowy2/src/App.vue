<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import axios from 'axios';
</script>


<template class=" w-screen h-full">
  <div class="">
  <Header></Header>
  <div class="_main pt-24 px-72">
    <div class="_imain bg-gray-800 flex items-center justify-center">
                <div class="">
                <div v-for="(cat, i) in questions" :key="`cat_${i}`" class="_Jhonson flex flex-col gap-4 pt-15">
                    <div class="_name flex-1 py-6">
                        <div class="text-20 text-center w-full">{{ cat.displayName }}</div>
                    </div>
                    <div class="_about absolute right-60 w-90 text-gray-300">
                    <div class="py-5 text-5 --font-secondary">WRRRRRRR</div>
                    
                    <div class="_role text-20 --font-secondary">
                      {{ cat.role?.displayName }}
                    </div>
                    <div class="py-5 text-5 --font-secondary">WRRRRR</div>
                    
                    <div class="_biography text-5 border-b border-white h-90">
                        {{ cat.description }}
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
  components:{
    Header
  },
    data() {
    return {
      questions: []
    };
  },
    methods: {async asyncData() {
        try {
          let Toster = []

          
            let response = await axios.get(`https://valorant-api.com/v1/agents`)
            Toster.push(...response.data.data)


            console.log('w111qeqweqweqe')
            console.log(response)
            console.log('wqeqweqweqe')
            console.log(response.data)
            console.log(Toster)
            this.questions=Toster
        } catch (err) {
            console.log(err)
            if (axios.isCancel(error)) {
                console.log('Aborted')
            } else {
                error({ statusCode: 500 })
                return
            }
        }
    },},
  mounted() { this.asyncData() ; console.log(this.questions)},
}
</script>
<style scoped>
body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin:0 ;
}
</style>
