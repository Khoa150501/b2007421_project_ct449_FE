import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Book from "@/views/Book.vue";
import Borrow from "@/views/Borrow.vue";
import ReadersView from "@/views/Readers.vue"

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
    name: "Login",
    component: Login,      // Route đến trang đăng nhập
  },
  {
    path: "/books",
    name: "books",
    component: Book,      // Route đến trang đăng nhập
  },
   {
    path: "/borrow",
    name: "borrow",
    component: Borrow,      // Route đến trang đăng nhập
  },
   {
    path: "/readers", // Thêm route cho trang quản lý độc giả
    name: "readers",
    component: ReadersView,
  },
   { path: '/readers', component: ReadersView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;