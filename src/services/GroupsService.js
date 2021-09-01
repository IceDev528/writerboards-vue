// import Api from '@/services/Api'
import axios from 'axios'

export default {
  // return groups current user belongs to
  async getGroups () {
    let response = await axios.get('groups') 
    if (response.status === 200) {
      return response.data;
    }
  },
  async getAllGroups () {
    let response = await axios.get('groups/all') 
    if (response.status === 200) {
      return response.data;
    }
  },
  async getGroupById (params) {
    return axios.get('groups/' + params.id)
  },
  async createGroup (params) {
    let response = await axios.post('groups', params) 
    if (response.status === 200) {
      return response.data;
    }
  },
  async updateGroup (params) {
    await axios.put('groups/' + params.id, params)
  }
}
