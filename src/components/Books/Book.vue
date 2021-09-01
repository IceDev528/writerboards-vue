<template>
  <!--
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div class="image-parent"> 
        <router-link :to="`/books/${book.id}`">
          <img :src="book.cover_url" class="img-fluid" :alt="book.title" >
        </router-link>
      </div>
      <router-link :to="`/books/${book.id}`">
        {{ book.title }}
      </router-link>
      {{ book.authors[0] }}
      <router-link :to="`/users/${book.users_id}`">
        {{ book.username }}
      </router-link>
      <div v-if="bookOwner(book)" class="">
        <div flat color="grey" @click="deleteBook(book.id)">
          <i class="fa fa-trash " ></i>
        </div>
      </div>
      <div v-else class="">
        <div flat color="grey" @click="borrowBook(book.id)" data-toggle="tooltip" title="Borrow This">
          <i class="fa fa-shopping-cart " ></i>
        </div>
      </div>
    </li>  -->

    <div class="col-md-6 col-lg-4">
      <div class="card border-0"> <!-- poosible animation class:  transform-on-hover-->
        <router-link :to="`/books/${book.id}`" class="lightbox">
          <img :src="book.cover_url" class="card-img-top" :alt="book.title" >
        </router-link>
        <!-- <div class="card-body">
          <h6>     
            <router-link :to="`/books/${book.id}`" class="lightbox">
              {{ book.title }}
            </router-link>
          </h6>
        </div> -->
        <div class="text-muted card-footer">
          <router-link :to="`/users/${book.users_id}`">
            Book owner: {{ book.username }}
          </router-link>
          <div v-if="bookOwner(book)" class="">
            <div flat color="grey" @click="deleteBook(book.id)">
              <i class="fa fa-trash " ></i>
            </div>
          </div>
          <div v-else class="">
            <div flat style="color:green;" v-if="isRequestedByUser" data-toggle="tooltip" title="You have requested this book."><i class="fa fa-check-square"></i></div>
            <div v-else flat color="grey" @click="borrowBook(book.id)" data-toggle="tooltip" title="Borrow this book">
              <i class="fa fa-shopping-bag " ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BooksService from '../../services/BooksService'
import LoansService from '../../services/LoansService'
export default {
  name: "Book",
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    me() {
      return this.$store.getters.user
    },
    loans() {
      return this.$store.state.requestedLoans
    },
    isRequestedByUser() {
      for(const loan of this.loans) {
        if (loan.books_id === this.book.id) {
          return true
        }
      }
      return false     
    }
  },
  methods: {
    deleteBook: async function (id) {
      if(confirm("Do you really want to remove this book from your collection?")) {
        let response = await BooksService.deleteBook(id)
        if (response.status === 200) {
          console.log('In Book.vue, book deleted, about to emit');
          this.$emit('book-deleted');
        }
      }
    },
    async borrowBook(id) {
      console.log('in Book.vue starting book request for book with id: ', id)
      let response = await LoansService.addLoan({
        borrowerId: this.me.id,
        bookId: id,
        lenderId: this.book.users_id // we already know the book owner. is this necessary?
      }) 
      if (response.status === 200) {
        console.log('In Book.vue, loan has been requested, about to emit');
        this.$store.dispatch('getRequestedLoans');
        this.$emit('loan-requested');
        this.displayNotice();
      }
    },
    // need to figure out how to get the loanId for this to work.
    deleteBookRequest: async function (id) {
      if(confirm("Do you really want to remove your book request?")) {
        let response = await LoansService.deleteLoan(id)
        if (response.status === 200) {
          console.log('In Book.vue, loan deleted, about to emit');
          this.$emit('loan-deleted');
        }
      }
    },
    bookOwner(book) {
      return this.me.id == book.users_id
    },
    displayNotice() {
      let phrase = "You have requested to borrow this book. The book owner will be notified."
      let title = "Book Loan Requested"
      this.$snotify.success(phrase, title,{
        timeout: 3500,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        position: "centerTop"
      })
    }
  }
};
</script>
<style scoped> 
  .image-parent {
    max-width: 40px;
  }
</style>
