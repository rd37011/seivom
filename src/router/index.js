import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import landingPage from "../views/landingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landingPage",
    component: landingPage
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
