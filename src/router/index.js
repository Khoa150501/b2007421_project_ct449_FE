import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Book from "@/views/Book.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
    {
    path: "/register",
    name: "register",
    component: Register,  // Route đến trang đăng ký
  },
  {
    path: "/login",
    name: "login",
    component: Login,      // Route đến trang đăng nhập
  },
  {
    path: "/books",
    name: "books",
    component: Book,      // Route đến trang đăng nhập
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;