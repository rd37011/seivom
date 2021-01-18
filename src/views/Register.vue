<template>
  <div>
    <v-form>
      <h4 class style="header">Register</h4>
      <v-container>
        <v-text-field v-model="name" label="Name" required></v-text-field>

        <v-text-field
          v-model="username"
          :rules="nameRules"
          :counter="10"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          :append-icon="show_pw ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password"
          :rules="[rules.required, rules.min]"
          :type="show_pass ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          value=""
          class="input-group--focused"
          @click:append="show_pw = !show_pw"
        ></v-text-field>

        <v-text-field
          :append-icon="show_pw ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="password_confirmation"
          :rules="[rules.required, rules.min]"
          :type="show_pass ? 'text' : 'password'"
          name="input-10-2"
          label="Re-enter password"
          value=""
          class="input-group--focused"
          @click:append="show_pw = !show_pw"
        ></v-text-field>

        <label>Is this an administrator account?</label>
        <div>
          <v-checkbox
            v-model="checkbox"
            :error-messages="errors"
            value="1"
            label="Admin?"
            type="checkbox"
            required
          ></v-checkbox>
        </div>

        <div>
          <v-btn type="submit" @click="handleSubmit">
            Register
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
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
  props: ["nextUrl"],
  data() {
    return {
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
      show_pass: false,
      show_pw: false,
      checkbox: false,
      is_admin: null,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
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
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let url = "http://localhost:3000/register";
        if (this.checkbox) url = "http://localhost:3000/register-admin";
        this.$http
          .post(url, {
            name: this.name,
            user_name: this.username,
            password: this.password,
            is_admin: this.checkbox
          })
          .then(response => {
            const responseObj = { ...response.data };
            this.authenticateUser(responseObj);
            this.addUser(responseObj.user);
            this.addJwt(response.data.token);

            if (this.getJwt != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.password = "";
        this.passwordConfirm = "";

        return alert("Passwords do not match");
      }
    }
  }
};
</script>
<style scoped>
header {
  padding-top: 5%;
}
</style>
