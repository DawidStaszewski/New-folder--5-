<template>
  <div class="min-h-screen flex flex-col">
    <div v-if="isStudentSection">
      <StudentSidebar />
    </div>
    <div v-else-if="isEmployerSection">
      <EmployerSidebar />
    </div>
    <div v-else-if="isAdminSection">
      <AdminSidebar />
    </div>
    <div v-else-if="isCareerOfficeSection">
      <CareerOfficeSidebar />
    </div>
    <div v-else>
      <router-view></router-view>
      <!-- <Sidebar /> -->
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import StudentSidebar from './components/student/StudentSidebar.vue';
import AdminSidebar from './components/admin/AdminSidebar.vue';
import EmployerSidebar from './components/employer/EmployerSidebar.vue';
import StudentHeader from './components/student/StudentHeader.vue';
import EmployerHeader from './components/employer/EmployerHeader.vue';
import { mapGetters } from "vuex";
import CareerOfficeSidebar from './components/career_office/CareerOfficeSidebar.vue';

export default {
  components: {
    StudentSidebar,
    StudentHeader,
    EmployerSidebar,
    EmployerHeader,
    AdminSidebar,
    CareerOfficeSidebar
  },
  computed: {
    ...mapGetters(["userRole"]),
    isStudentSection() {
  return parseInt(this.userRole) === 1;
},
isEmployerSection() {
  return parseInt(this.userRole) === 2;
},
isCareerOfficeSection() {
  return parseInt(this.userRole) === 3;
},
isAdminSection() {
  return parseInt(this.userRole) === 4;
},
  },
  watch: {
    userRole(newRole) {
      console.log("Role changed:", newRole);
      if (!newRole) {
      this.$router.push("/login");
    }
    },
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
