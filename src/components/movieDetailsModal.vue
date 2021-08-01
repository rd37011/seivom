<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Movie Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                {{ moviedetails.title }}
              </v-col>
              <v-col cols="12">
                {{ moviedetails.info.plot }}
              </v-col>
              <v-col cols="12">
                Starring 
                <span v-for="actor in moviedetails.info.actors" :key="actor">
                    {{ actor }},
                </span>
                
                Directed by
                  <span v-for="director in moviedetails.info.directors" :key="director">
                    {{ director }}
                  </span>
              </v-col>
              <v-col cols="12" sm="6" md="4">{{
                moviedetails.info.genre
              }}</v-col>
              <v-col cols="12" sm="6" md="4">{{ moviedetails.year }}</v-col>
              <v-col cols="12" sm="6" md="4">English</v-col>
              <v-col cols="12" sm="6" md="4"
                >User Ratings
                <v-rating
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                  medium
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="getIsAdmin()">
            <v-btn
              color="blue darken-1"
              text
              @click.stop="editModalShow = true"
            >
              Edit
            </v-btn>
          </div>
          <v-btn color="blue darken-1" text @click.stop="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div ref="editDetails">
      <editDetailsModal
        v-model="editModalShow"
        :year="moviedetails.year"
        :title="moviedetails.title"
      />
    </div>
  </v-row>
</template>
<script>
import editDetailsModal from "./editDetailsModal";
import { DELETE_MOVIE, GET_ADMIN_STATUS } from "../store/index.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "movieDetailsModal",
  props: {
    //   obj: Object,
    moviedetails: Object,
    value: Boolean,
  },
  components: {
    editDetailsModal,
  },
  data: () => ({
    editModalShow: false,
    rating: 0,
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions({
      deleteMovie: DELETE_MOVIE,
    }),
    ...mapGetters({
      getIsAdmin: GET_ADMIN_STATUS,
    }),
  },
};
</script>
<style>
.display {
  padding-left: -50px;
}
</style>
