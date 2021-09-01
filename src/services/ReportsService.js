// import Api from '@/services/Api'
import axios from 'axios'

export default {
  async getLeaderboard (group) {
    let response = await axios.get('reports/leaderboard/' + group.id, {
      params: {
        group: group
      }
    }) 
    console.log('In ReportsService, leaderboard response: ', response.data.id);
    if (response.status === 200) {
      return response.data;
    }
  }
}