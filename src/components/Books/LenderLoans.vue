<template>
  <div class="">
    <h4 class="text-warning">Books you are lending:</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Borrower</th>
          <th>Current Status</th>
          <th>Last Update</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loan,i) in lenderLoans" :key="i">
          <td scope="row">{{ loan.book.title  }}</td>
          <td scope="row">{{ loan.borrower.username }}</td>
          <td scope="row">{{ loan.status  }}</td>
          <td scope="row">{{ moment(loan.updated_at).strftime("%A, %d %b %Y %l:%M %p") }}</td>
          <td scope="row">
            <a v-show="loan.status == 'requested'" flat color="grey" @click="acceptBookRequest(loan.id)" data-toggle="tooltip" title="Click to agree to lend this book.">
              <i class="far fa-handshake" ></i>
            </a>
            <a v-show="loan.status == 'promised'" flat color="grey" @click="deliverBook(loan.id)" data-toggle="tooltip" title="Click when you deliver the book.">
              <i class="fa fa-paper-plane" ></i>
            </a>
            <a v-show="loan.status == 'returned'" flat color="grey" @click="closeLoan(loan.id)" data-toggle="tooltip" title="Click when you receive the book back.">
              <i class="fa fa-check" ></i>
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
  name: "LenderLoans",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  mounted() {
    this.getLenderLoans();
  },
  computed: {
    lenderLoans() {
      return this.$store.state.lenderLoans;
    },
  },
  methods: {
    getLenderLoans () {
      console.log('In LenderLoans.vue, getting lender loans')
      this.$store.dispatch("getLenderLoans");
      console.log('lenderLoans length is: ', this.$store.state.lenderLoans.length)
    },
    moment: function (datetime) {
      return moment(datetime);
    },
    acceptBookRequest: async function (id) {
      let response = await LoansService.updateLoan({
        id: id,
        promised_at: new Date(),
        status: 'promised'
      })
      if (response.status === 200) {
        console.log('In LenderLoans.vue, loan updated');
        this.getLenderLoans();
      }
    },
    deliverBook: async function (id) {
      let response = await LoansService.updateLoan({
        id: id,
        delivered_at: new Date(),
        status: 'delivered'
      })
      if (response.status === 200) {
        console.log('In LenderLoans.vue, loan updated');
        this.getLenderLoans();
      }
    },
    closeLoan: async function (id) {
      let response = await LoansService.updateLoan({
        id: id,
        completed_at: new Date(),
        status: 'lender_received'
      })
      if (response.status === 200) {
        console.log('In LenderLoans.vue, loan updated');
        this.getLenderLoans();
      }
    }
  }
};
</script>
