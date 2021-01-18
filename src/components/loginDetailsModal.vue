<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h3 class="headline">Login</h3>
          <v-spacer></v-spacer>
          <v-btn color="info" text @click.stop="show = false">Close</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>Sign in with your username and password:</p>
          <v-form>
            <v-text-field
              outline
              label="Username"
              type="text"
              v-model="username"
            ></v-text-field>
            <v-text-field
              outline
              hide-details
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            :large="$vuetify.breakpoint.smAndUp"
            @click.stop="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  ADD_JWT,
  AUTHENTICATE_USER,
  REGISTER_USER,
  GET_JWT
} from "../store/index.js";
export default {
  name: "loginDetailsModal",
  props: {
    value: Boolean
  },
  data: () => ({
    username: "",
    password: "",
    response: {},
    is_admin: false
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions({
      addJwt: ADD_JWT,
      authenticateUser: AUTHENTICATE_USER,
      addUser: REGISTER_USER
    }),
    ...mapGetters({
      getJwt: GET_JWT
    }),
    login(e) {
      e.preventDefault();
      if (this.password.length > 0) {
        this.$http
          .post("http://localhost:3000/login", {
            user_name: this.username,
            password: this.password
          })
          .then(response => {
            this.is_admin = response.data.user.is_admin;
            const responseObj = { ...response.data };
            this.authenticateUser(responseObj);
            this.addUser(responseObj.user);
            this.addJwt(response.data.token);

            if (this.getJwt != null) {
              this.$emit("loggedIn"); // emits event here? maybe we can leverage store value to toggle auth
              this.show = false;
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("home");
              }
            }
          })
          .catch(function(error) {
            console.error(error.response);
          });
      }
    },
    register() {
      this.dialog = false;
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped>
.v-card__title {
  text-transform: uppercase;
}
</style>
