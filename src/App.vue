<template>
  <div id="app">
    <v-app>
      <div id="nav">
        <v-system-bar app>
          <v-spacer></v-spacer>

          <v-icon>mdi-square</v-icon>

          <v-icon>mdi-circle</v-icon>

          <v-icon>mdi-triangle</v-icon>
        </v-system-bar>

        <v-app-bar app>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title> </v-toolbar-title>
          <div class="branding">
            <v-spacer></v-spacer>
            <router-link to="/home">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/register">Register</router-link>
          </div>
          <v-btn
            v-if="this.$store.state.isAuthenticated"
            @click.stop="logout"
            id="logout-button"
            >Logout</v-btn
          >
          <v-btn v-else @click.stop="loginModalShow = true" id="login-button"
            >Login</v-btn
          >
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <router-view></router-view>
        </v-main>
        <div ref="loginDetailsModal">
          <loginDetailsModal v-model="loginModalShow" />
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import loginDetailsModal from "./components/loginDetailsModal";
import { mapGetters, mapActions } from "vuex";
import {
  GET_JWT,
  GET_AUTH_STATUS,
  LOGOUT,
  FETCH_MOVIES,
} from "./store/index.js";

export default {
  name: "App",
  data: () => ({
    title: "Vue Groups",
    drawer: false,
    group: null,
    loginModalShow: false,
  }),
  methods: {
    ...mapGetters({
      getJwt: GET_JWT,
      getAuthStatus: GET_AUTH_STATUS,
    }),
    ...mapActions({
      clearUser: LOGOUT,
      fetchMovies: FETCH_MOVIES,
    }),
    isAuthenticated() {
      return this.getAuthStatus;
    },
    logout() {
      this.clearUser(); // revokes JWT, deletes current user from local storage, toggles admin and auth
      if (this.$route.path !== "/") this.$router.push({ path: "/" });
    },
  },
  created() {
    this.fetchMovies();
    // Read the status information in sessionStorage when the page loads
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    // Save the information in vuex to sessionStorage when the page is refreshed
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  components: {
    loginDetailsModal,
    // landingPage
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.branding {
  flex: 1;
  text-align: left;
}
h1,
h2 {
  text-align: center;
}
.router {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.content {
  padding-top: 16px;
  padding-bottom: 16px;
  width: 1024px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
