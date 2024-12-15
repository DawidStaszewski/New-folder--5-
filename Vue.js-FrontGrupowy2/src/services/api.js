import axios from "axios";
import store from "@/store";
axios.defaults.baseURL = "http://localhost:8080/";
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust the base URL to match your Laravel API URL
  withCredentials: true, // Include credentials for CSRF protection if necessary
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getUser() {
    return apiClient.get("/user/me");
  },
  createOffer(offer) {
    return apiClient.post("/offer/add", offer);
  },
  myOffers() {
    return apiClient.get("/employer/my_offers");
  },
  UpdateUser(data) {
    return apiClient.patch("/student/edit", data);
  },
  UpdateEmployer(data) {
    return apiClient.patch("/student/edit", data);
  },
  // Student Authentication
  studentRegister(data) {
    return apiClient.post("/register", data);
  },
  studentLogin(data) {
    return apiClient.post("/login", data);
  },
  getStudentMe() {
    return apiClient.get("/student/me");
  },
  getJobOffers() {
    return apiClient.get("/offer/list");
  },
  getJobOffersByCompetence(competenceId) {
    return apiClient.get(`/offer/competence/${competenceId}`);
  },
  getJobOfferById(id) {
    return apiClient.get(`/offer/${id}`);
  },

  // Administrator Authentication
  administratorRegister(data) {
    return apiClient.post("/administrator/register", data);
  },
  administratorLogin(data) {
    return apiClient.post("/administrator/login", data);
  },
  getAdministratorMe() {
    return apiClient.get("/administrator/me");
  },

  // Pracodawca Authentication
  pracodawcaRegister(data) {
    return apiClient.post("/register", data);
  },
  pracodawcaLogin(data) {
    return apiClient.post("/pracodawca/login", data);
  },
  getPracodawcaMe() {
    return apiClient.get("/pracodawca/me");
  },

  // Pracownik Biura Karier Authentication
  pracownikBiuraKarierRegister(data) {
    return apiClient.post("/pracownikbiurakarier/register", data);
  },
  pracownikBiuraKarierLogin(data) {
    return apiClient.post("/pracownikbiurakarier/login", data);
  },
  getPracownikBiuraKarierMe() {
    return apiClient.get("/pracownikbiurakarier/me");
  },
  getCompetenceList() {
    return apiClient.get("/competence/list");
  },
};

//Add token to request if exist
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getters.isAuthenticated ? store.state.token : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
