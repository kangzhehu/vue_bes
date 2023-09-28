import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
      path: '/',
      name: 'test',
      component: () => import("../views/map.vue"),
      
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  {
    path:"/map",
    name: "map",
    component: () => import("../views/map.vue"),
  },
  {
    path:"/table",
    name: "table",
    component:()=>import("../components/admin/Table.vue")
  }
];
const router = new VueRouter({
  routes,
});

export default router;
