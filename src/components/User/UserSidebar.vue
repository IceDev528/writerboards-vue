<template>
  <div>
    <div class="ui attached segment rounded">
      <form class="ui form" @submit.prevent="createPost">
        <div class="field">
          <textarea name="post" v-model="post" @keyup='remaincharCount()' rows="2" placeholder="Compose post" ></textarea>
        </div>

        <button type='submit' class="ui btn btn-primary btn-block" :disabled="!isFormValid">Post to {{ currentGroup.name }}</button>
        <small v-bind:class="{'text-danger': postOverLimit() }">{{ remainCharacters }} </small>
      </form>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
import ActsService from '@/services/ActsService'
export default {
  name: "UserSidebar",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      post: "",
      maxCharacter: 255,
      remainCharacters: 255
    };
  },
  computed: {
    isFormValid() {
      return !!this.post;
    },
    currentGroup() {
      return this.$store.getters.currentGroup;
    },
    colorAsDanger() {
      return this.postOverLimit;
    }
  },
  methods: {
    async createPost () {
      console.log('From UserSidebar, this is the currentGroup.id: ', this.$store.getters.currentGroup.id);
      let result = await PostsService.addPost({
        post: {
          body: this.post,
          groupId: this.$store.getters.currentGroup.id,
          userId: this.user.id // needs to be token eventually
        }
      });
      this.$emit("post-created");
      window.analytics.track('Post created', {
        body: this.post,
        user: this.user.username
      });
      this.post = '';
      console.log('post created');
    },
    remaincharCount: function() {
      this.remainCharacters = this.maxCharacter - this.post.length;
    },
    postOverLimit() {
      return this.remainCharacters < 0;
    }
  }
};
</script>
