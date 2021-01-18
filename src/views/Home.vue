<template>
  <v-app id="inspire">
    <v-main class="grey lighten-2">
      <v-container>
        <v-row class="rows">
          <template v-for="n in 4">
            <!-- <v-col :key="n" class="mt-2" cols="auto">
              <strong>Category {{ n }}</strong>
            </v-col> -->

            <v-col v-for="j in 4" :key="`${n}${j}`" cols="auto">
              <v-card class="mx-auto" max-width="344">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  height="200px"
                ></v-img>

                <v-card-title>
                  TITLE
                </v-card-title>

                <v-card-subtitle>
                  GENRE
                </v-card-subtitle>
                <v-card-subtitle>
                  RATING
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="orange lighten-2"
                    text
                    @click.stop="detailsModalShow = true"
                  >
                    Explore
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn icon @click="show = !show">
                    <v-icon>{{
                      show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      I'm a thing. But, like most politicians, he promised more
                      than he could deliver. You won't have time for sleeping,
                      soldier, not with all the bed making you'll be doing. Then
                      we'll go with that data file! Hey, you add a one and two
                      zeros to that or we walk! You're going to do his laundry?
                      I've got to find a way to escape.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
    <div ref="detailsDialog">
      <movieDetailsModal v-model="detailsModalShow" />
    </div>
  </v-app>
</template>
<script>
import movieDetailsModal from "../components/movieDetailsModal";
export default {
  data: () => ({
    show: false,
    detailsModalShow: false,
    drawer: null,
    isUser: false,
    isAdmin: false
  }),
  components: {
    movieDetailsModal
  },
  methods: {
    showDialog() {
      this.$refs.detailsDialog.show();
    }
  }
};
</script>
<style scoped></style>
