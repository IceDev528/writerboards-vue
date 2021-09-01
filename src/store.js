import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import PostsService from './services/PostsService'
import ReportsService from './services/ReportsService'
import KudosService from './services/KudosService'
import ActsService from './services/ActsService'
import GroupsService from './services/GroupsService'
import BooksService from './services/BooksService'
import LoansService from './services/LoansService'

// import SubscriptionsService from './services/SubscriptionsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token') || '',
    posts: null,
    leaderboard: [],
    currentGroup: {},
    lastAct: '',
    userActs: [],
    ownedBooks: [],
    groupOwnedBooks: [],
    requestedLoans: [], // loans where current user has requested
    borrowerLoans: [], // loans where current user is borrower
    lenderLoans: [], // loans where current user is lender
    userPosts: [],
    location: {}
  },
  mutations: {
    auth_request (state) {
      state.status = 'Signing in...'
    },
    set_user (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
      console.log('store sets user as: ', user)
    },
    auth_success (state) {
      state.status = 'success'
    },
    auth_error (state) {
      state.status = 'Invalid credentials'
    },
    logout (state) {
      state.status = ''
      state.user = null
      localStorage.removeItem('user')
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setUserPosts(state, posts) {
      state.userPosts = posts;
    },
    setLeaderboard(state, leaderboard) {
      state.leaderboard = leaderboard
    },
    setCurrentGroup(state, group) {
      state.currentGroup = group
    },
    setKudos(state, kudos) {
      state.kudos = kudos;
    },
    setLastAct(state, lastAct) {
      state.lastAct = lastAct;
      console.log('store sets this last act: ', lastAct)
    },
    setUserActs(state, userActs) {
      state.userActs = userActs
    },
    setOwnedBooks(state, ownedBooks) {
      state.ownedBooks = ownedBooks;
    },
    setGroupOwnedBooks(state, groupOwnedBooks) {
      state.groupOwnedBooks = groupOwnedBooks;
    },
    setRequestedLoans(state, requestedLoans) {
      state.requestedLoans = requestedLoans;
    },
    setBorrowerLoans(state, borrowerLoans) {
      state.borrowerLoans = borrowerLoans;
    },
    setLenderLoans(state, lenderLoans) {
      state.lenderLoans = lenderLoans;
    },
    set_location(state, place) {
      state.location = place;
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log('in store register action, root_api: ',process.env.VUE_APP_ROOT_API)
        axios({ url: '/auth', data: user, method: 'POST' })
          .then(async resp => {
            const token = "Token " + resp.data.user.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['token'] = token
            commit('auth_success')
            commit('set_user', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log('in store login action, user is: ',user);
        axios({ url: '/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = "Token " + resp.data.user.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['token'] = token
            this.dispatch("getUserGroups")
            commit('auth_success')
            commit('set_user', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            commit('logout')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['token']
        resolve()
      })
    },
    getPosts({ commit }) {
      PostsService.fetchGroupPosts()
        .then(resp => {
          console.log('in store getPosts, this is groupPosts: ', resp);
          commit('setPosts', resp.data);
        });
    },
    getUserPosts({ commit }) {
      // returns all posts by current user
      PostsService.fetchUserPosts()
        .then(resp => {
          console.log('in store getPosts, this is userPosts: ', resp);
          commit('setUserPosts', resp.data);
        });
    },
    getUserGroups({ commit }) {
      GroupsService.getGroups()
        .then(resp => {
          console.log('in store getUserGroups, this is usergroups: ', resp);
            commit('setCurrentGroup', resp.data[0]);
        });
    },
    updateLeaderboard({ commit }, group) {
      ReportsService.getLeaderboard(group)
        .then(resp => {
          commit('setLeaderboard', resp);
        });
    },
    getKudos({ commit }) {
      KudosService.fetchKudos()
        .then(resp => {
          commit('setKudos', resp.data);
        });
    },
    async getLastAct({ commit }) {
      await ActsService.fetchLastAct()
        .then(resp => {
          console.log('in store getLastAct, this is the last act: ', resp);
          commit('setLastAct', resp.data[0]);
        });
    },
    async getUserActs({ commit }) {
      ActsService.fetchCurrentUserActs()
        .then(resp => {
          commit('setUserActs', resp.data);
        });
    },
    setUser({ commit }, user ) {
      const token = "Token " + user.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['token'] = token
      commit('set_user', user )
    },
    getOwnedBooks({ commit }, user) {
      BooksService.fetchOwnedBooks(user.id)
        .then(resp => {
          console.log('in store, getOwnedBooks,this is ownedBooks: ', resp);
          commit('setOwnedBooks', resp.data);
        });
    },
    getGroupOwnedBooks({ commit }) {
      BooksService.fetchGroupOwnedBooks()
        .then(resp => {
          console.log('in store get, this is groupOwnedBooks: ', resp);
          commit('setGroupOwnedBooks', resp.data);
        });
    },
    async getRequestedLoans({ commit }) {
      await LoansService.fetchRequestedLoans()
      .then(resp => {
        console.log('in store retrieving requested loans by current user');
        commit('setRequestedLoans', resp.data)
      })
    },
    async getBorrowerLoans({ commit }) {
      await LoansService.fetchBorrowerLoans()
      .then(resp => {
        console.log('in store retrieving loans where borrower is current user');
        commit('setBorrowerLoans', resp.data)
      })
    },
    async getLenderLoans({ commit }) {
      await LoansService.fetchLenderLoans()
      .then(resp => {
        console.log('in store retrieving loans where Lender is current user');
        commit('setLenderLoans', resp.data)
      })
    },
    setLocation({ commit }, place ) {
      commit('set_location', place )
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    authStatus: state => state.status,
    user: state => state.user,
    token: state => state.token,
    posts: state => {
      return state.posts;
    },
    kudos: state => {
      return state.kudos;
    },
    leaderboard: state => {
      return state.leaderboard;
    },
    currentGroup: state => {
      return state.currentGroup;
    },
    lastAct: state => {
      return state.lastAct;
    },
    userActs: state => {
      return state.userActs
    }
  }
})