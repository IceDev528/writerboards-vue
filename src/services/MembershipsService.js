// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchMemberships () {
    return axios.get('memberships')
  },

  addMembership (params) {
    return axios.post('memberships', params)
  },

  // getMembership (params) {
  //   return axios.get('memberships/' + params.id)
  // },

  // updateMembership (params) {
  //   return axios.put('memberships/' + params.id, params)
  // },

  deleteMembership (params) {
    console.log('In MembershipsService, these are the request params: ', params);
    return axios.delete('memberships/', {data: params})
  }
}
