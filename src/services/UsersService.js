// import Api from '@/services/Api'
import axios from 'axios'

export default {
  async getCurrentUser () {
    let response = await axios.get('auth/currentUser') 
    if (response.status === 200) {
      return response.data;
    }
  },
  async getUserById (params) {
    return axios.get('users/' + params.id)
  },
  async updateUser (params) {
    await axios.put('users/' + params.id, params)
  }
}
