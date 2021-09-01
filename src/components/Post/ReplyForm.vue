<template>
  <div class="">
    <form class="form" @submit.prevent="createReply">
      <div class="field">
        <textarea class='form-control' name="reply" v-model="reply" rows="2" placeholder="Compose reply"></textarea>
      </div>
      <button type='submit' class="ui btn btn-primary btn-block" :disabled="!isFormValid">Submit Reply</button>
    </form>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";
export default {
  name: "ReplyForm",
  props: {
    parents_id: Number
  },
  data() {
    return {
      reply: ""
    };
  },
  computed: {
    isFormValid() {
      return !!this.reply;
    },
    currentGroup() {
      return this.$store.getters.currentPost;
    }
  },
  methods: {
    async createReply () {
      let result = await PostsService.addPost({
        post: {
          body: this.reply,
          parents_id: this.parents_id
        }
      });
      this.$emit("reply-created");
      window.analytics.track('Reply created', {
        body: this.reply
      });
      this.reply = '';
    }
  }
};
</script>
