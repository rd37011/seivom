<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
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
          <v-btn color="info" text>
            Forgot password?
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "loginDetailsModal",
  props: {
    //   obj: Object,
    value: Boolean
  },
  data: () => ({
    editModalShow: false
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
  }
};
</script>
<style scoped>
/* .display {
  padding-left: -50px;
} */
</style>
