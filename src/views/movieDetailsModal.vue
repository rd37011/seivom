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
                <!-- Title, Plot, Cast & Crew, Genre, Release Date, Language, Collective Ratin -->
                Shawshank Redemption
              </v-col>
              <v-col cols="12">
                Two imprisoned men bond over a number of years, finding solace
                and eventual redemption through acts of common decency.
              </v-col>
              <v-col cols="12">
                Directed by Frank Darabont. Written by Stephen King (short story
                "Rita Hayworth and Shawshank Redemption"), Frank Darabont
                (screenplay) Starring Tim Robbins, Morgan Freeman, Bob Gunton
              </v-col>
              <v-col cols="12" sm="6" md="4">Drama</v-col>
              <v-col cols="12" sm="6" md="4">Released 14 October 1994</v-col>
              <v-col cols="12" sm="6" md="4">English</v-col>
              <v-col cols="12" sm="6" md="4"
                >User Ratings
                <v-rating
                  v-model="rating"
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
    value: Boolean
  },
  components: {
    editDetailsModal
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
.display {
  padding-left: -50px;
}
</style>
