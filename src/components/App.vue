<template>
  <div id="app">
    <NavigationBar />
    <div class="container mt-20">
      <router-view />
    </div>
    <Footer />
    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
import NavigationBar from '@/components/layout/NavigationBar'
import Footer from '@/components/layout/Footer'
export default {
  name: "App",
  components: {
    NavigationBar,
    Footer
  }
};
</script>

<style>
body {
  background-color: #f7f7f7;
}

.is-danger {
  color: #9f3a38;
}
</style>
