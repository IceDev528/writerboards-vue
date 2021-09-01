<template>
  <div class="">
    <NewBook  v-on:book-created="getOwnedBooks(user.id)" />
    <h4 mt-10 class="text-warning">Your Books:</h4>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Authors</th>
          <th>Date added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in books" :key="`${i}-${book.id} `">
          <td>
            <router-link :to="`/books/${book.id}`" class="lightbox">
              {{ book.title }}
            </router-link>
          </td>
          <td>{{ book.authors[0] }}</td>
          <td>{{ moment(book.created_at).strftime("%A, %d %b %Y %l:%M %p") }}</td>
          <td>
            <div flat color="grey" @click="deleteBook(book.id)">
              <i class="fa fa-trash " ></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BooksService from '../../services/BooksService'
import NewBook from "@/components/Books/NewBook";
import moment from 'moment-strftime';

export default {
  name: "UserBooks",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    NewBook
  },
  mounted() {
    this.getOwnedBooks();
  },
  computed: {
    books() {
      return this.$store.state.ownedBooks;
    },
  },
  methods: {
    getOwnedBooks () {
      console.log('In UserBooks.vue, getting owned books')
      console.log('In UserBooks.vue, this.user is: ', this.user)
      this.$store.dispatch("getOwnedBooks", this.user);
    },
    deleteBook: async function (id) {
      if(confirm("Do you really want to remove this book from your collection?")) {
        let response = await BooksService.deleteBook(id)
        if (response.status === 200) {
          console.log('In Book.vue, book deleted, about to emit');
          this.$emit('book-deleted');
        }
      }
      this.getOwnedBooks();
    },
    moment: function (datetime) {
      return moment(datetime);
    }
  }
};
</script>