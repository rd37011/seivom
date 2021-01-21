<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Movie Deets (admin only)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  solo
                  label="Plot"
                  hint="Plot"
                  v-model="plot"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  solo
                  label="Cast and crew"
                  persistent-hint
                  required
                  v-model="castMem"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
                  v-model="select"
                  :items="[
                    'Drama',
                    'Action',
                    'Thriller',
                    'Comedy',
                    'Tragedy',
                    'Situational',
                    'Classic',
                    'Suspense',
                    'Horror',
                    'Other'
                  ]"
                  label="Genre"
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Language"
                  required
                  v-model="lang"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="User Ratings"
                  required
                  v-model="rating"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="show = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.stop="saveMovieHandler(), show = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { UPDATE_MOVIE_DETAILS, GET_ALL_MOVIES, GET_ADMIN_STATUS, FETCH_MOVIES } from "../store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "editDetailsModal",
  props: {
    //   obj: Object,
    title: String,
    year: String,
    value: Boolean
  },
  data: function() {
    return {
      select: "",
      valid: true,
      plot: "",
      castMem: "",
      lang: "",
      rating: 3.5
    };
  },
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
      updateMovieDetails: UPDATE_MOVIE_DETAILS,
      fetchMovies: FETCH_MOVIES
    }),
    ...mapGetters({
      getIsAdmin: GET_ADMIN_STATUS,
      getMovies: GET_ALL_MOVIES
    }),
    async saveMovieHandler() {
      const req = {
        year: this.year,
        title: this.title,
        info: {
          lang: this.lang,
          plot: this.plot,
          castMem: this.castMem,
          rating: this.rating,
          genre: this.select
        }
      };
      try {
        await this.updateMovieDetails(req).then(this.fetchMovies());
        this.getMovies();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style scoped></style>
