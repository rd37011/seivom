import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import landingPage from "../views/landingPage.vue";
import Register from "../views/Register";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "landingPage",
      component: landingPage,
      meta: {
        guest: true
      }
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {
        guest: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        guest: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && to.path !== "/") {
    if (store.state.jwt === null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      });
    } else {
      let user = store.state.user;
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next();
        } else {
          next({ name: "home" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.jwt == null) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router;
