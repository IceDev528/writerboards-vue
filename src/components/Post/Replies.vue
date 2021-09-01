<template>
  <!-- Section: Social newsfeed v.2 -->
  <section class="my-1">
    <!-- Grid row -->
    <div class="">
      <!-- Grid column -->
      <!-- Newsfeed -->
      <ReplyForm :parents_id = parents_id v-on:reply-created="getReplies" />
      <ol class="tweet-list">
        <Post v-for="reply in replies" :key="reply.id" :post="reply" v-on:post-deleted="getReplies" />
      </ol>
    </div>
  </section>
</template>

<script>
// import Post from "@/components/Post/Post";
import PostsService from "@/services/PostsService";

export default {
  name: "Replies",
  data() {
    return {
      replies: []
    };
  },
  props: {
    parents_id: Number
  },
  components: {
    Post: () => import('@/components/Post/Post.vue'), 
    ReplyForm: () => import('@/components/Post/ReplyForm.vue')
  },
  mounted() {
    this.getReplies();
  },
  methods: {
    async getReplies () {
      console.log('getting replies')
      let response = await PostsService.getReplies(this.parents_id);
      console.log('this is response aftergetreplies: ', response)
      this.replies = response.data;
      this.$emit('sendReplies', this.replies)
    }
  }
};
</script>