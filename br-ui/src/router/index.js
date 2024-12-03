import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import SignupPage from "../components/SignupPage.vue";
import BookIndex from "../components/Book/BookIndex.vue"

const routes = [
  { path: "/", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/bookindex", component: BookIndex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
