<template>
  <div class="mb-3" >
    <h4 class="text-primary">Enter an ISBN to offer a new book:</h4>
    <b-form class="form" inline @submit.prevent="createBook">
      <b-input
        id="inline-form-input-isbn"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="e.g. 9781440346026"
        v-model="isbn"
        name="isbn"
      ></b-input>

      <b-button type='submit' variant="primary" :disabled="!isFormValid">Add Book</b-button>
    </b-form>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'
export default {
  name: "NewBook",
  data() {
    return {
      isbn: ""
    };
  },
  computed: {
    isFormValid() {
      return !!this.isbn;
    }
  },
  methods: {
    async createBook () {
      console.log('In NewBook.vue, creating book');
      let result = await BooksService.addBook({
        isbn: this.isbn.replace(/-|\s/g,"")
      });
      this.$emit("book-created");
      this.displayNotice();
      this.isbn = '';
      console.log('In NewBook.vue, this is the result of create: ', result);
    },
    displayNotice() {
      let phrase = "Your book has been added!"
      let title = "Book Created"
      this.$snotify.success(phrase, title,{
        timeout: 2500,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        position: "centerTop"
      })
    }
  }
};
</script>
