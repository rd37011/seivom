<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Movie Deets (editable only by admin)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Movie title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea solo label="Plot" hint="Lorem ipsum"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Cast and crew"
                  hint="Lorem ipsum"
                  persistent-hint
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-autocomplete
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
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Release date" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Language" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="User Ratings" required></v-text-field>
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
          <v-btn color="blue darken-1" text @click.stop="show = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "editDetailsModal",
  props: {
    //   obj: Object,
    value: Boolean
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
  }
};
</script>
<style scoped></style>
