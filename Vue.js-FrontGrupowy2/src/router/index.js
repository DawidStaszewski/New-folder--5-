import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Main from "../views/Main.vue";
import Form from "@/views/Form.vue";
import StudentForm from "@/views/StudentForm.vue";
import EmployerForm from "@/views/EmployerForm.vue";
import LoginView from "@/views/LoginView.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/LoginView",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/Main",
      name: "Main",
      component: Main,
    },
    {
      path: "/Form",
      name: "Form",
      component: Form,
    },
    {
      path: "/StudentForm",
      name: "StudentForm",
      component: StudentForm,
    },
    {
      path: "/EmployerForm",
      name: "EmployerForm",
      component: EmployerForm,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
