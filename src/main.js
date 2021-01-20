import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import aws_exports from "./aws-exports";

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

Amplify.configure(aws_exports);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
