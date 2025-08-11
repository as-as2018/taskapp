import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@Views/DashboardView.vue";
import TaskView from "@Views/TaskView.vue";

const routes = [
  {
    path: "/",
    component: DashboardView,
  },
  {
    path: "/tasks",
    component: TaskView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
