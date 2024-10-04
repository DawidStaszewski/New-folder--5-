import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Adjust the base URL to match your Laravel API URL
  withCredentials: true, // Include credentials for CSRF protection if necessary
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Student Authentication
  studentRegister(data) {
    return apiClient.post("/register", data);
  },
  studentLogin(data) {
    return apiClient.post("/student/login", data);
  },
  getStudentMe() {
    return apiClient.get("/student/me");
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
    return apiClient.post("/pracodawca/register", data);
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

  // General User Authentication
  getUser() {
    return apiClient.get("/user");
  },
};
