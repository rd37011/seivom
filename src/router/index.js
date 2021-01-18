import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import landingPage from "../views/landingPage.vue";
import Register from "../views/Register";
import store from "../store/index";

// import { isInGroup } from "../auth/user";
// import Auth from "@okta/okta-vue";
// import { OktaAuth } from "@okta/okta-auth-js";

// const config = {
// issuer: "https://dev-8538426.okta.com/oauth2/default",
// clientId: "0oa3vvetpjE0993sA5d6",
// redirectUri: window.location.origin + "/login/callback",
// scopes: ["openid", "profile", "email"]
// }
Vue.use(Router);
// Vue.use(Auth, {...config});
// const oktaAuth = new OktaAuth({
//   issuer: "https://dev-8538426.okta.com/oauth2/default",
//   clientId: "0oa3vvetpjE0993sA5d6",
//   redirectUri: window.location.origin + "/login/callback",
//   scopes: ["openid", "profile", "email"]
// });
// Vue.use(Auth, {
//   issuer: 'https://dev-8538426.okta.com/oauth2/default',
//   clientId: '0oa3vvetpjE0993sA5d6',
//   redirectUri: 'http://localhost:8080/implicit/callback',
//   scope: 'openid profile email'
// })
// Vue.use(oktaAuth);
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
      // beforeEnter: async (to, from, next) => {
      //   next((await isInGroup("Users")) || (await isInGroup("Admins")));
      // }
    },
    {
      path: "*",
      beforeEnter: (to, from, next) => {
        next("/");
      },
      meta: {
        guest: true
      }
    },
    // {
    //   path: "login/callback",
    //   component: Auth.handleCallback()
    // },
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
// const onAuthRequired = async (from, to, next) => {
//   if (
//     from.matched.some(record => record.meta.requiresAuth) &&
//     !(await Vue.prototype.$auth.isAuthenticated())
//   ) {
//     // Navigate to custom login page
//     next({ path: "/" });
//   } else {
//     next();
//   }
// };
// router.beforeEach(onAuthRequired);
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && to.path !== "/") {
    if (store.state.jwt === null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      });
    } else {
      // console.log(JSON.parse(store.state.user));
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
