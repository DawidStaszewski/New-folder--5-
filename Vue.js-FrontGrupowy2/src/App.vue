
<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="isStudentSection" >
      <Sidebar />
    </div>
    <div v-else >
        <router-view></router-view>
        <!-- <Sidebar /> -->
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/student/Sidebar.vue';
import StudentHeader from './components/student/StudentHeader.vue';
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  components: {
    Sidebar,
    StudentHeader
  },
  computed: {
    ...mapGetters(["userRole"]),
    isStudentSection() {
      console.log('User Role:', this.userRole);  
      return this.userRole === "1"; 
    }
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
  background-color: #121212;
  color: #e0e0e0;
}
</style>
