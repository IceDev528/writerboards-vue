<template>
  <section class="gallery-block cards-gallery">
    <NewBook  v-on:book-created="getGroupOwnedBooks" />
    <div class="heading">
      <h2>Books Available for Borrowing:</h2>
    </div>
    <div class="row">
      <Book v-for="(book, i) in books" :key="`${i}-${book.id} `" :book="book" v-on:book-deleted="getGroupOwnedBooks"/>
    </div>
  </section>   
</template>

<script>
import Book from "@/components/Books/Book";
import NewBook from "@/components/Books/NewBook";

export default {
  name: "Books",
  components: {
    Book,
    NewBook
  },
  mounted() {
    this.getGroupOwnedBooks();
  },
  computed: {
    books() {
      return this.$store.state.groupOwnedBooks;
    },
  },
  methods: {
    getGroupOwnedBooks () {
      console.log('In Books.vue, getting group books')
      this.$store.dispatch("getGroupOwnedBooks");
    }
  }
};
</script>

