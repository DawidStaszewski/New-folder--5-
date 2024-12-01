import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login.vue";
import StudentRegister from "@/views/register/StudentRegister.vue";
import EmployerRegister from "@/views/register/EmployerRegister.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import PKSForm from "@/views/PKSForm.vue";
import UserBanTemporary from "@/views/UserBanTemporary.vue";
import NewOffer from "@/views/employer/NewOffer.vue";
import MyOffers from "@/views/employer/MyOffers.vue";
import EmployerProfile from "@/views/employer/EmployerProfile.vue";
import QuizPage from "@/views/student/QuizPage.vue";
import EducationalMaterials from "@/views/student/EducationalMaterials.vue";
import JobOffers from "@/views/student/JobOffers.vue";
import StudentProfilePage from "@/views/student/StudentProfilePage.vue";
import EmployerProfilePage from "@/views/employer/EmployerProfilePage.vue";
import JobOfferDetails from "@/views/student/JobOfferDetails.vue";
import EducationalMaterialDetail from "@/views/student/EducationalMaterialDetail.vue";
import EmployersList from "@/views/admin/EmployersList.vue";
import AdminCreateUser from "@/views/admin/AdminCreateUser.vue";
import UserList from "@/views/admin/UserList.vue";
import CareerOfficeMaterials from "@/views/career_office/CareerOfficeMaterials.vue";
import MaterialDetail from "@/views/career_office/MaterialDetail.vue";
import AddMaterial from "@/views/career_office/AddMaterial.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },

    {
      path: "/employer/new-offer",
      name: "NewOffer",
      component: NewOffer,
    },
    {
      path: "/employer/my-offers",
      name: "MyOffers",
      component: MyOffers,
    },
    {
      path: "/employer/profile",
      name: "ProfilePage",
      component: EmployerProfilePage,
    },
    {
      path: "/employer",
      name: "EmployerProfilePage",
      component: EmployerProfilePage,
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
      path: "/Login",
      name: "Login",
      component: Login,
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
      path: "/admin/employer-verification",
      name: "EmployersList",
      component: EmployersList,
      // meta: {
      //   requiresAuth: true,
      //   roles: [4],
      // },
    },
    {
      path: "/admin/user-list",
      name: "UserList",
      component: UserList,
      // meta: {
      //   requiresAuth: true,
      //   roles: [4],
      // },
    },
    {
      path: "/admin/create-user",
      name: "AdminCreateUser",
      component: AdminCreateUser,
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
      path: "/student/educational-materials/:id",
      name: "EducationalMaterialDetail",
      component: EducationalMaterialDetail,
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
      name: "StudentProfilePage",
      component: StudentProfilePage,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/career-office/my-materials",
      name: "CareerOfficeMaterials",
      component: CareerOfficeMaterials,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/career-office/add-material",
      name: "AddMaterial",
      component: AddMaterial,
      // meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/career-office/my-materials/:id",
      name: "MaterialDetail",
      component: MaterialDetail,
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
