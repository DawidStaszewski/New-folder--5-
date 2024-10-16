import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Main from "../views/Main.vue";
import Form from "@/views/Form.vue";
import StudentForm from "@/views/StudentForm.vue";
import EmployerForm from "@/views/EmployerForm.vue";
import LoginView from "@/views/LoginView.vue";
import Login from "@/views/Login.vue";
import StudentRegister from "@/views/register/StudentRegister.vue";
import EmployerRegister from "@/views/register/EmployerRegister.vue";
import AdminPannel from "@/views/AdminPannel.vue";
import PKSForm from "@/views/PKSForm.vue";
import UserBanTemporary from "@/views/UserBanTemporary.vue";
import EmployerPannel from "@/views/EmployerPannel.vue";
import NewOffer from "@/views/employer/NewOffer.vue";
import MyOffers from "@/views/employer/MyOffers.vue";
import EmployerProfile from "@/views/employer/EmployerProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/EmployerPannel",
      name: "EmployerPannel",
      component: EmployerPannel,
      children: [
        {
          path: "new-offer", // /EmployerPannel/new-offer
          name: "NewOffer",
          component: NewOffer,
        },
        {
          path: "my-offers", // /EmployerPannel/my-offers
          name: "MyOffers",
          component: MyOffers,
        },
        {
          path: "profile", // /EmployerPannel/profile
          name: "EmployerProfile",
          component: EmployerProfile,
        },
      ],
    },
    {
      path: "/LoginView",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/student/register",
      name: "StudentRegister",
      component: StudentRegister,
    },
    {
      path: "/employer/register",
      name: "EmployerRegister",
      component: EmployerRegister,
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
      path: "/PKSForm",
      name: "PKSForm",
      component: PKSForm,
    },
    {
      path: "/AdminPannel",
      name: "AdminPannel",
      component: AdminPannel,
    },
    {
      path: "/UserBanTemporary",
      name: "UserBanTemporary",
      component: UserBanTemporary,
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
