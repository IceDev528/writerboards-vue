// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchKudos () {
    return axios.get('kudos')
  },

  addKudos (params) {
    return axios.post('kudos', params)
  },

  deleteKudos (id) {
    return axios.delete('kudos/' + id)
  }
}
