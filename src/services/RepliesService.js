// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchReplies (params) {
    return axios.post('replies/post_replies', params)
  },

  addReply (params) {
    return axios.post('replies', params)
  },

  deleteReply (id) {
    return axios.delete('replies/' + id)
  }
}
