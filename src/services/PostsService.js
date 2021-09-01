// import Api from '@/services/Api'
import axios from 'axios'

export default {
  //retrieve all posts by current user
  fetchUserPosts () {
    return axios.get('posts')
  },
  
  // retrieves posts from all groups to which user belongs
  fetchGroupPosts () {
    return axios.get('users/group-posts')
  },

  addPost (params) {
    return axios.post('posts', params)
  },

  getPost (params) {
    return axios.get('posts/' + params.id)
  },

  updatePost (params) {
    return axios.put('posts/' + params.id, params)
  },

  deletePost (id) {
    return axios.delete('posts/' + id)
  },

  getReplies (id) {
    return axios.get('posts/'+ id + '/replies')
  }
}