import axios from "axios";
import store from "@/store";
axios.defaults.baseURL = "http://localhost:8000/";
export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust the base URL to match your Laravel API URL
  withCredentials: true, // Include credentials for CSRF protection if necessary
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default {
  getUser() {
    return apiClient.get("/user/me");
  },
  getQuizResults(studentId) {
    return apiClient.get(`/quiz/results/career-path/${studentId}`);
  },
  getEducationalMaterials() {
    return apiClient.get("/education_materials/all");
  },
  getEducationalMaterial(id) {
    return apiClient.get(`/education_materials/${id}`);
  },
  createOffer(offer) {
    return apiClient.post("/offer/add", offer);
  },
  myOffers() {
    return apiClient.get("/employer/my_offers");
  },
  getOfferTypes(){
    return apiClient.get("/offer/types");
  },
  UpdateUser(data) {
    return apiClient.patch("/student/edit", data);
  },
  UpdateEmployer(data) {
    return apiClient.patch("/employer", data);
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
  submitQuizResults(data) {
    return apiClient.post("/quiz/results", data); // Endpoint do wysyłania wyników quizu
  },
  getJobOffers() {
    return apiClient.get("/offer/list");
  },
  getJobOffersByCompetence(competenceId) {
    return apiClient.get(`/offer/competence/${competenceId}`);
  },
  getJobOffersByType(typeId) {
    return apiClient.get(`/offer/type/${typeId}`);
  },
  getJobOffersByFilter(filter) {
    return apiClient.post("/offers/filtered", filter);
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
