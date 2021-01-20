<template>
  <v-app id="inspire">
    <v-container>
      <!-- <v-row class="rows">
          <template v-for="n in 4"> -->
      <!-- <v-col :key="n" class="mt-2" cols="auto">
              <strong>Category {{ n }}</strong>
            </v-col> -->

      <!-- <v-col v-for="j in 4" :key="`${n}${j}`" cols="auto"> -->
      <v-flex d-flex>
        <v-layout wrap>
          <v-flex md4 v-for="(movie, index) in getMovies()" :key="index">
            <v-card class="mx-auto" max-width="344">
              <v-img :srcset="movie.image_url" height="200px"></v-img>

              <v-card-title>
                {{ movie.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ movie.info.genres }}
              </v-card-subtitle>
              <v-card-subtitle>
                {{ movie.info.year }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  @click.stop="
                    (detailsModalShow = true), (movieDetails = movie)
                  "
                >
                  Details
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <!-- 
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
                </v-expand-transition> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- </v-col>
          </template>
        </v-row> -->
    </v-container>
    <div ref="detailsDialog">
      <movieDetailsModal
        v-model="detailsModalShow"
        :moviedetails="movieDetails"
      />
    </div>
  </v-app>
</template>
<script>
import movieDetailsModal from "../components/movieDetailsModal";
import { mapGetters, mapActions } from "vuex";
import { GET_ALL_MOVIES, GET_MOVIE, FETCH_MOVIES } from "../store/index.js";
export default {
  data: () => ({
    show: false,
    detailsModalShow: false,
    drawer: null,
    isUser: false,
    isAdmin: false,
    movies: [],
    movieDetails: {},
    curr_index: 0
  }),
  components: {
    movieDetailsModal
  },
  computed: {
    // fetchMovies() {
    //   // this.movies = this.getMovies;
    //   return this.getMovies;
    // },
    current_movie() {
      return this.movies[this.curr_index];
    }
  },
  methods: {
    ...mapGetters({
      getMovies: GET_ALL_MOVIES,
      getMovie: GET_MOVIE
    }),
    ...mapActions({
      fetchMovies: FETCH_MOVIES
    }),
    showDialog() {
      this.$refs.detailsDialog.show();
    },
    detailsHandler(index) {
      this.curr_index = index;
      this.detailsModalShow = true;
      console.log(index);
    },
    async created() {
      await this.fetchMovies();
      console.log("movies: ", this.movies);
    }
  }
};
</script>
<style scoped></style>
