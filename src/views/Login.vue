<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">Sign in:</h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <a id="twitter-button" class="btn btn-block btn-social btn-twitter" :href="twitter_login_url">
        <i class="fa fa-twitter"></i> Sign in with Twitter
      </a>

      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" v-model="email" placeholder="Email" required>
        </div>

        <div class="field">
          <label>Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" required>
        </div>

        <button class="fluid ui primary button">LOG IN</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Don't have an account? <router-link to="/signup">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/global/Notification'
export default {
  name: 'LogIn',
  components: {
    Notification
  },
  data () {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },
  computed: {
    twitter_login_url () {
      console.log('in login page, twitter url: ', process.env.VUE_APP_TWITTER_LOGIN)
      return process.env.VUE_APP_TWITTER_LOGIN
    }
  },
  mounted() {
    window.analytics.page('Login') // from segment.io docs
  },
  methods: {
    login: function () {
      let data = {
        user: {
          email: this.email,
          password: this.password
        }
      }
      this.$store.dispatch('login', data)
        .then(() => this.$router.push('/'))
        .catch(err => {
          console.log('in login page, error is: ',err)
          console.log('in login page, error logging in')
          this.notification.message = 'Invalid credentials'
          this.notification.type = "alert alert-danger"
        })
      // Add your own unique ID here or we will automatically assign an anonymousID
      window.analytics.identify({
        email: this.email
      })
    },
  }
}
</script>
