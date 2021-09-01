<template>
  <!-- Jumbotron -->
  <div class="jumbotron text-center blue-grey lighten-5">

    <!-- Title -->
    <h2 class="card-title h2">Join the group...</h2>

    <!-- Grid row -->
    <div class="row d-flex justify-content-center">

      <!-- Grid column -->
      <div class="col-xl-7 pb-2">

        <p class="card-text">The whole point of WriterBoards is writing groups, authors helping authors. So join the group and once a day, click the green button at the top of the page to log that you achieved your daily writing goal (We'll trust you to tell the truth). Then see where you rank!</p>

      </div>
      <!-- Grid column -->

    </div>
    <!-- Grid row -->

    <hr class="my-4 pb-2">

    <button class="btn btn-lg btn-outline-primary btn-rounded">
      <router-link :to="{ name: 'SearchGroups' }">
        Let's do it! <i class="fas fa-search"></i>
      </router-link>
    </button>

  </div>
  <!-- Jumbotron -->
</template>
