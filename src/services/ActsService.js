// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchActs () {
    return axios.get('acts')
  },

  fetchCurrentUserActs () {
    return axios.get('acts/current_user')
  },

  fetchActsByUser (params) {
    return axios.get('acts/by_user', params)
  },

  fetchLastActByUser (params) {
    console.log('In ActsService fetchLastAct, calling the last act service with userId: ', params.userId)
    return axios.post('acts/last_by_user', params)
  },

  addAct (params) {
    return axios.post('acts', params)
  },

  getAct (params) {
    return axios.get('acts/' + params.id)
  },
  
  // retrieve last act for curret user
  fetchLastAct () {
    return axios.get('acts/last')
  },

  deleteAct (id) {
    return axios.delete('acts/' + id)
  }
}
