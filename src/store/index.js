import Vue from "vue";
import Vuex from "vuex";
import { API } from "aws-amplify";

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
export const FETCH_MOVIES = "FETCH_MOVIES";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false,
    jwt: null,
    isAdmin: false,
    movies: []
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
    }
  },
  actions: {
    // UPDATE_MOVIE_DETAILS
    async [UPDATE_MOVIE_DETAILS]({ commit }, details) {
      try {
        await API.put("moviesApi", "/movies", {
          body: details
        }).then(res => {
          console.log("response from update: ", res);
          commit("FETCH_MOVIES");
        });
      } catch (err) {
        console.error(err);
      }
    },
    async [ADD_NEW_MOVIE]({ state, commit }, payload) {
      const currentMovies = state.movies;
      try {
        await API.post("moviesApi", "/movies", {
          body: payload
        }).then(res => {
          console.log("response from add: ",res);
          currentMovies.push(res);
        });
      } catch (err) {
        console.error(err);
      }
      commit("SET_MOVIE_DETAILS", currentMovies);
    },
    async [DELETE_MOVIE]({ state, commit }, payload) {
      try {
        await API.del("moviesApi", "/movies", {
          body: payload
        }).then(res => {
          console.log("response from delete: ",res);
          const currentMovies = state.movies;
          currentMovies.splice(payload.index, 1);
          commit("SET_MOVIE_DETAILS", currentMovies);
        });
      } catch (err) {
        console.error(err);
      }
    },
    async [FETCH_MOVIES]({ commit }) {
      try {
        await API.get("moviesApi", "/movies").then(res => {
          console.log("response from fetch: ", res);
          commit("SET_MOVIE_DETAILS", res);
        });
      } catch (err) {
        console.error(err);
      }
    },
    [AUTHENTICATE_USER]({ commit }, payload) {
      // make API call to auth
      commit("SET_AUTH_STATUS", payload.auth);
      commit("SET_ADMIN_STATUS", payload.user.is_admin);
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
