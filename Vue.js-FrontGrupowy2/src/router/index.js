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
import AdminPanel from "@/views/AdminPanel.vue";
import PKSForm from "@/views/PKSForm.vue";
import UserBanTemporary from "@/views/UserBanTemporary.vue";
import EmployerPanel from "@/views/EmployerPanel.vue";
import NewOffer from "@/views/employer/NewOffer.vue";
import MyOffers from "@/views/employer/MyOffers.vue";
import EmployerProfile from "@/views/employer/EmployerProfile.vue";
import QuizPage from "@/views/student/QuizPage.vue";
import EducationalMaterials from "@/views/student/EducationalMaterials.vue";
import JobOffers from "@/views/student/JobOffers.vue";
import ProfilePage from "@/views/student/ProfilePage.vue";
import JobOfferDetails from "@/views/student/JobOfferDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/EmployerPanel",
      name: "EmployerPanel",
      component: EmployerPanel,
      children: [
        {
          path: "new-offer", // /EmployerPanel/new-offer
          name: "NewOffer",
          component: NewOffer,
        },
        {
          path: "my-offers", // /EmployerPanel/my-offers
          name: "MyOffers",
          component: MyOffers,
        },
        {
          path: "profile", // /EmployerPanel/profile
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
      path: "/AdminPanel",
      name: "AdminPanel",
      component: AdminPanel,
      // meta: {
      //   requiresAuth: true,
      //   roles: [4],
      // },
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
    {
      path: "/student/quiz",
      name: "QuizPage",
      component: QuizPage,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/student/educational-materials",
      name: "EducationalMaterials",
      component: EducationalMaterials,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/student/job-offers",
      name: "JobOffers",
      component: JobOffers,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/student/job-offers/:id",
      name: "JobOfferDetails",
      component: JobOfferDetails,
      props: true,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/student/profile",
      name: "ProfilePage",
      component: ProfilePage,
      // meta: { requiresAuth: true, roles: [1] },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters.isAuthenticated;

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      // If authenticated, check if role is allowed
      const userRole = store.getters.userRole;
      const allowedRoles = to.meta.roles;

      if (allowedRoles && allowedRoles.includes(userRole)) {
        next();
      } else {
        // If role is not allowed, redirect to login or unauthorized page
        next({ path: "/login", query: { unauthorized: true } });
      }
    }
  } else {
    // If route does not require auth, proceed
    next();
  }
});

export default router;
