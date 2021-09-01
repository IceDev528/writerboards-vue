// import Api from '@/services/Api'
import axios from 'axios'

export default {
  fetchBooks () {
    return axios.get('books')
  },

  fetchOwnedBooks (params) {
    console.log('In BooksService fetchOwned params is: ', params)
    return axios.get('books/by_user/' + params)
  },

  fetchGroupOwnedBooks () {
    return axios.get('users/group-books')
  },

  addBook (params) {
    console.log('In BooksService fetchOwned, params in addBook: ', params)
    return axios.post('books', params)
  },

  getBookById (params) {
    return axios.get('books/' + params.id)
  },

  updateBook (params) {
    return axios.put('books/' + params.id, params)
  },

  deleteBook (id) {
    return axios.delete('books/' + id)
  }
}