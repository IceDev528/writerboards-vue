<template>
  <li class="tweet-card">
    <div 
      class="tweet-content" >
      <div class="tweet-header">
        <router-link :to="`/users/${post.users_id}`">
          <img v-if="post.avatar_url" :src="post.avatar_url" class="tweet-card-avatar"/>
          <img v-else :src="'https://robohash.org/'+ post.username" class="tweet-card-avatar"/>
        </router-link>
        <span class="fullname">
          <router-link :to="`/users/${post.users_id}`">
            <strong>@{{ post.username }}</strong>
          </router-link>
        </span>
      / <router-link :to="`/groups/${post.groups_id}`">
          <small>{{ post.name }}</small>
        </router-link> 
        <span class="tweet-time">- {{ post.created_at | timeAgo }}</span>
      </div>
      <div class="tweet-text">
        <p class="" lang="es" data-aria-label-part="0">{{ post.body }}
          <a href="" class="twitter-hashtag" dir="ltr"></a>
        </p>
      </div>
      <div class="tweet-footer mt-2">
        <!-- <a class="tweet-footer-btn">
          <i class="octicon octicon-comment" aria-hidden="true"></i><span> 10</span>
        </a> -->
        <!-- <template class="tweet-footer-btn">
          <i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>
        </!-->
        <a v-show="postOwner(post)" class="tweet-footer-btn" flat color="grey" @click="deletePost(post.id)">
          <i class="fa fa-trash " ></i>
        </a>
        <a class="tweet-footer-btn" v-if="isLikedByUser">
          <i class="fa fa-thumbs-up" style="color:green" aria-hidden="true" @click="unLikePost(post.id)"></i><span> {{ this.likes.length }} </span> 
          <!-- <small v-if="isLikedByUser">you liked this</small> -->
        </a>
        <a class="tweet-footer-btn" v-else>
          <i class="fa fa-thumbs-up" aria-hidden="true" @click="likePost(post.id)"></i>
          <span>{{ this.likes.length }}</span>
        </a>
        <a class="tweet-footer-btn" flat color="grey" @click="displayReplies()">
          <i class="fa fa-comments " ></i><span> {{ this.replies.length }} </span>
        </a>
      </div>
      <Replies v-show="showReplies" :parents_id = post.id v-on:sendReplies="getChildReplies" />
    </div>
  </li>
</template>

<script>
import PostsService from '../../services/PostsService'
import RepliesService from '../../services/RepliesService'
import LikesService from '../../services/LikesService'
import Replies from '@/components/Post/Replies'
import ReplyForm from '@/components/Post/ReplyForm'
export default {
  name: "Post",
  data() {
    return {
      likes: [],
      showReplies: false,
      replies: []
    };
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    Replies,
    ReplyForm
  },
  computed: {
    me() {
      return this.$store.getters.user
    },
    // replies() {
    //   console.log(this.post.replies.length)
    //   return this.post.replies.length
    // },
    isLikedByUser() {
      for(const like of this.likes) {
        if (like.user.id === this.me.id) {
          return true
        }
      }
      return false     
    }
  },
  mounted() {
    this.getLikes(this.post.id)
  },
  methods: {
    deletePost: async function (id) {
      if(confirm("Do you really want to delete this post?")) {
        let response = await PostsService.deletePost(id)
        if (response.status === 200) {
          console.log('In Post deletePost, post deleted, about to emit');
          this.$emit('post-deleted');
        }
      }
    },
    postOwner(post) {
      return this.me.id == post.users_id
    },
    async getLikes(postId) {
      let result = await LikesService.fetchLikes({
        postId: postId
      })
      this.likes = result.data
    },
    async unLikePost(postId) {
      let response = await LikesService.deleteLike({
        id: postId
      })
      if (response.status === 200) {
        console.log('IN Post.vue, like deleted, about to emit');
        this.$emit('like-deleted');
      }
      this.getLikes(postId)
    },
    async likePost(postId) {
      let result = await LikesService.addLike({
        postId: postId
      })
      this.getLikes(postId)
    },
    displayReplies() {
      this.showReplies = !this.showReplies 
    },
    getChildReplies(value) {
      this.replies = value
    }
  }
};
</script>
