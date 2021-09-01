// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchLoans () {
    return axios.get('loans')
  },

  fetchRequestedLoans () {
    return axios.get('loans/requested_by_user')
  },

  fetchBorrowerLoans () {
    console.log('fetching BorrowerLoans')
    return axios.get('loans/by_borrower')
  },

  fetchLenderLoans () {
    console.log('fetching LenderLoans')
    return axios.get('loans/by_lender')
  },

  addLoan (params) {
    console.log('In LoansService addLoan params is: ', params)
    return axios.post('loans', params)
  },

  updateLoan (params) {
    return axios.patch('loans/' + params.id, params)
  },

  deleteLoan (params) {
    return axios.delete('loans/' + params)
  }
}
