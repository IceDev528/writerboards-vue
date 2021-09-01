<template>
  <div class="ui container">
    <img v-if="!!book.cover_url" class="ui medium rounded image" :src="book.cover_url">
    <h2>
      {{ book.title }}
    </h2>
    <p>Authors:
      {{ book.authors }}
    </p>
    <p>Description: {{ book.description }}</p>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'
export default {
  name: 'BookShow',
  data () {
    return {
      book: {}
    }
  },
  computed: {
  },
  mounted () {
    this.getBookById ()
    window.analytics.page('Book Show') // from segment.io docs
  },
  methods: {
    async getBookById () {
      const response = await BooksService.getBookById({
        id: this.$route.params.id
      })
      this.book = response.data;
    }
  },
  components: {
  }
}
</script>