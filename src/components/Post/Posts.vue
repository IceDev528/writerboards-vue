<template>
  <!-- Section: Social newsfeed v.2 -->
  <section class="my-1">
    <!-- Grid row -->
    <div class="">
      <!-- Grid column -->
      <!-- Newsfeed -->
      <ol class="tweet-list">
        <Post v-for="post in posts" :key="post.id" :post="post" v-on:post-deleted="getPosts"/>
      </ol>
    </div>
  </section>
</template>

<script>
import Post from "@/components/Post/Post";

export default {
  name: "Posts",
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    getPosts () {
      console.log('In Posts.vue, getting posts')
      this.$store.dispatch("getPosts");
    }
  }
};
</script>