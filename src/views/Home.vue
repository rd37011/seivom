<template>
  <v-app id="inspire">
    <v-container>
      <v-flex d-flex>
        <v-layout wrap>
          <v-flex md4 v-for="(movie, index) in getMovies()" :key="index">
            <v-card class="mx-auto" max-width="344">
              <v-img src="../assets/images.jpeg" height="200px"></v-img>

              <v-card-title>
                {{ movie.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ movie.info.genres }}
              </v-card-subtitle>
              <v-card-subtitle>
                {{ movie.year }}
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
                <div v-if="getIsAdmin()">
                  <v-btn
                    color="orange lighten-2"
                    text
                    @click.stop="deleteMovieHandler(movie)"
                  >
                    Delete
                  </v-btn>
                </div>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
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
import {
  GET_ALL_MOVIES,
  GET_MOVIE,
  FETCH_MOVIES,
  GET_ADMIN_STATUS,
  GET_JWT,
  DELETE_MOVIE
} from "../store/index.js";
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
    current_movie() {
      return this.movies[this.curr_index];
    }
  },
  methods: {
    ...mapGetters({
      getMovies: GET_ALL_MOVIES,
      getMovie: GET_MOVIE,
      getIsAdmin: GET_ADMIN_STATUS,
      getJwt: GET_JWT
    }),
    ...mapActions({
      fetchAllMovies: FETCH_MOVIES,
      deleteMovie: DELETE_MOVIE
    }),
    showDialog() {
      this.$refs.detailsDialog.show();
    },
    detailsHandler(index) {
      this.curr_index = index;
      this.detailsModalShow = true;
    },
    deleteMovieHandler(movie) {
      const body = {
        year: movie.year,
        title: movie.title
      };
      if (this.getIsAdmin() === 1 && this.getJwt() != null) {
        this.deleteMovie(body);
      }
    },
    created() {
      this.getMovies();
    }
  }
};
</script>
<style scoped></style>
