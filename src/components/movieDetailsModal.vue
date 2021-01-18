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
                {{ moviedetails.plot }}
              </v-col>
              <v-col cols="12">
                {{ moviedetails.cast }}
              </v-col>
              <v-col cols="12" sm="6" md="4">{{ moviedetails.genre }}</v-col>
              <v-col cols="12" sm="6" md="4">{{
                moviedetails.release_date
              }}</v-col>
              <v-col cols="12" sm="6" md="4">{{ moviedetails.language }}</v-col>
              <v-col cols="12" sm="6" md="4"
                >User Ratings
                <v-rating
                  v-model="moviedetails.rating"
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
          <v-btn color="blue darken-1" text @click.stop="editModalShow = true">
            Edit
          </v-btn>
          <v-btn color="blue darken-1" text @click.stop="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div ref="editDetails">
      <editDetailsModal v-model="editModalShow" />
    </div>
  </v-row>
</template>
<script>
import editDetailsModal from "./editDetailsModal";
export default {
  name: "movieDetailsModal",
  props: {
    //   obj: Object,
    moviedetails: Object,
    value: Boolean
  },
  components: {
    editDetailsModal
  },
  data: () => ({
    editModalShow: false,
    rating: 0
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
<style>
.display {
  padding-left: -50px;
}
</style>
