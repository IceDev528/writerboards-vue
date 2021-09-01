// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchLikes (params) {
    return axios.post('likes/post_likes', params)
  },

  addLike (params) {
    return axios.post('likes', params)
  },

  deleteLike (params) {
    return axios.delete('likes/' + params.id)
  }
}
