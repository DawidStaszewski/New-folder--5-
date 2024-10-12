<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import MainSearch from './components/MainSearch.vue'
import axios from 'axios';
</script>


<template class=" w-screen h-full">
  <router-view />
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
    async asyncData() { }
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
