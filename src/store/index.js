import Vue from "vue";
import Vuex from "vuex";

// Getters
export const GET_ALL_MOVIES = "GET_ALL_MOVIES";
export const GET_MOVIE = "GET_MOVIE";
export const GET_ADMIN_STATUS = "GET_ADMIN_STATUS";
export const GET_AUTH_STATUS = "GET_AUTH_STATUS";
export const GET_JWT = "GET_JWT";
export const GET_USER = "GET_USER";

// Mutations
export const SET_ADMIN_STATUS = "SET_ADMIN_STATUS";
export const SET_AUTH_STATUS = "SET_AUTH_STATUS";
export const SET_MOVIE_DETAILS = "SET_MOVIE_DETAILS";
export const SET_REGISTER_USER = "SET_REGISTER_USER";
export const SET_JWT = "SET_JWT";
export const SET_LOGOUT = "SET_LOGOUT";

// Actions
export const UPDATE_MOVIE_DETAILS = "UPDATE_MOVIE_DETAILS";
export const DELETE_MOVIE = "DELETE_MOVIE";
export const ADD_NEW_MOVIE = "ADD_NEW_MOVIE";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const REGISTER_USER = "REGISTER_USER";
export const ADD_JWT = "ADD_JWT";
export const LOGOUT = "LOGOUT";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false,
    jwt: null,
    isAdmin: false,
    movies: [
      {
        id: 0,
        title: "Shawshank Redemption",
        plot:
          "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        cast:
          'Directed by Frank Darabont. Written by Stephen King (short story /"Rita Hayworth and Shawshank Redemption/"), Frank Darabont (screenplay) Starring Tim Robbins, Morgan Freeman, Bob Gunton',
        genre: "Drama",
        rating: 4,
        release_date: "Released 14 October 1994",
        language: "English"
      },
      {
        id: 1,
        title: "Black Panther",
        plot:
          "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.",
        cast:
          "Directed by Ryan Coogler. Written by Ryan Coogler, Joe Robert Cole. Starring Chadwick Boseman, Michael B. Jordan",
        genre: "Adventure, Fantasy, Action",
        rating: 5,
        release_date: "Released 16 Feb 2018",
        language: "English"
      }
    ]
  },
  getters: {
    // GET_MOVIES
    [GET_ALL_MOVIES]: state => {
      return state.movies;
    },
    [GET_MOVIE]: (state, index) => {
      return state.movies[index];
    },
    [GET_AUTH_STATUS]: state => {
      return state.isAuthenticated;
    },
    [GET_ADMIN_STATUS]: state => {
      return state.isAdmin;
    },
    [GET_JWT]: state => {
      return state.jwt;
    },
    [GET_USER]: state => {
      return state.user;
    }
  },
  mutations: {
    [SET_MOVIE_DETAILS]: (state, payload) => {
      state.movies = payload;
    },
    [SET_AUTH_STATUS]: (state, payload) => {
      state.isAuthenticated = payload;
    },
    [SET_ADMIN_STATUS]: (state, payload) => {
      state.isAdmin = payload;
    },
    [SET_REGISTER_USER]: (state, payload) => {
      state.user = payload;
    },
    [SET_JWT]: (state, payload) => {
      state.jwt = payload;
    },
    [SET_LOGOUT]: state => {
      state.user = {}; // clear user, jwt, auth status, admin status
      state.isAuthenticated = false;
      state.isAdmin = 0;
      state.jwt = null;
      console.log("updated state: should be logged out:", state);
    }
  },
  actions: {
    // UPDATE_MOVIE_DETAILS
    [UPDATE_MOVIE_DETAILS]({ state, commit }, index, details) {
      const currentMovies = state.movies;
      currentMovies.splice(index, 1, details);
      // update details in API call. maybe another action
      commit("SET_MOVIE_DETAILS", currentMovies);
    },
    [ADD_NEW_MOVIE]({ state, commit }, payload) {
      const currentMovies = state.movies;
      currentMovies.push(payload);
      // update details in API call. maybe another action
      commit("SET_MOVIE_DETAILS", currentMovies);
    },
    [DELETE_MOVIE]({ state, commit }, index) {
      const currentMovies = state.movies;
      currentMovies.splice(index, 1);
      // update details in API call. maybe another action
      commit("SET_MOVIE_DETAILS", currentMovies);
    },
    [AUTHENTICATE_USER]({ commit }, payload) {
      // make API call to auth
      commit("SET_AUTH_STATUS", payload.auth);
      commit("SET_ADMIN_STATUS", payload.user.is_admin); // change this based on new GET_USER action
    },
    [REGISTER_USER]({ commit }, payload) {
      commit("SET_REGISTER_USER", payload);
    },
    [ADD_JWT]({ commit }, payload) {
      commit("SET_JWT", payload);
    },
    [LOGOUT]({ commit }) {
      commit("SET_LOGOUT");
    }
  },
  // DELETE_MOVIE
  // ADD_NEW_MOVIE
  // SET_AUTHENTICATION_STATUS
  // SET_ADMIN_STATUS
  modules: {}
});
// CREATE READ UPDATE DELETE
