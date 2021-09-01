<template>
<div class="">
  <h4 mt-10 class="text-warning">Books you are borrowing:</h4>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Title</th>
        <th>Lender</th>
        <th>Current Status</th>
        <th>Last Update</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(loan,i) in borrowerLoans" :key="i">
        <td scope="row">{{ loan.book.title  }}</td>
        <td scope="row">{{ loan.lender.username }}</td>
        <td scope="row">{{ loan.status  }}</td>
        <td scope="row">{{ moment(loan.updated_at).strftime("%A, %d %b %Y %l:%M %p") }}</td>
        <td scope="row">
          <a v-show="loan.status == 'requested'" flat color="grey" @click="deleteBookRequest(loan.id)" data-toggle="tooltip" title="Cancel this request.">
            <i class="fa fa-trash " ></i>
          </a>
          <a v-show="loan.status == 'delivered'" flat color="grey" @click="confirmDelivery(loan.id)" data-toggle="tooltip" title="Click when you receive the book.">
            <i class="far fa-handshake" ></i>
          </a>
          <a v-show="loan.status == 'borrower_received'" flat color="grey" @click="returnBook(loan.id)" data-toggle="tooltip" title="Click when you have returned the book.">
            <i class="far fa-paper-plane" ></i>
          </a>
          <a v-show="loan.status == 'lender_received'" flat color="grey">
            Completed
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import moment from 'moment-strftime';
import NewBook from "@/components/Books/NewBook";
import LoansService from '../../services/LoansService'

export default {
  name: "BorrowerLoans",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  mounted() {
    this.getBorrowerLoans();
  },
  computed: {
    borrowerLoans() {
      return this.$store.state.borrowerLoans;
    },
  },
  methods: {
    getBorrowerLoans () {
      console.log('In BorrowerLoans.vue, getting borrower loans')
      this.$store.dispatch("getBorrowerLoans");
      console.log('borrowerLoans length is: ', this.$store.state.borrowerLoans.length)
    },
    moment: function (datetime) {
      return moment(datetime);
    },
    deleteBookRequest: async function (id) {
      if(confirm("Do you really want to remove your book request?")) {
        let response = await LoansService.deleteLoan(id)
        if (response.status === 200) {
          console.log('In BorrowerLoans.vue, loan deleted');
          this.getBorrowerLoans();
        }
      }
    },
    confirmDelivery: async function (id) {
      console.log('confirming delivery for loanid: ', id);
      let response = await LoansService.updateLoan({
        id: id,
        borrower_received_at: new Date(),
        status: 'borrower_received'
      })
      if (response.status === 200) {
        console.log('In LenderLoans.vue, loan updated to borrower_received');
        this.getBorrowerLoans();
      }
    },
    returnBook: async function (id) {
      console.log('returning book for loanid: ', id);
      let response = await LoansService.updateLoan({
        id: id,
        returned_at: new Date(),
        status: 'returned'
      })
      if (response.status === 200) {
        console.log('In LenderLoans.vue, loan updated to returned');
        this.getBorrowerLoans();
      }
    }
  }
};
</script>
