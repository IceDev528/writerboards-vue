<template>
  <div id="calendar-card" class="ui attached segment rounded">
    <!-- Using Component -->
    <h4 class="text-center">Writing Days:</h4>
    <hr>
    <calendar
      :eventCategories="eventCategories"
      :events="events"
      ref="calendar"
    />
  </div>
</template>

<script>
// Importing Component and style
import { Calendar } from 'vue-sweet-calendar'
import 'vue-sweet-calendar/dist/SweetCalendar.css'
import ActsService from '@/services/ActsService'

export default {
  name: 'CalendarCard',
  data() {
    return {
      eventCategories: [
        {
          id: 1,
          title: 'Personal',
          textColor: 'white',
          backgroundColor: '#5475ed'
        },
        {
          id: 2,
          title: 'Company-wide',
          textColor: 'white',
          backgroundColor: 'red'
        }
      ]
    }
  },
  computed: {
    userActs() {
      return this.$store.getters.userActs
    },
    events() {
      return this.userActs.map(item => ({
        title: item.deed,
        start: item.created_at,
        end: item.created_at,
        repeat: 'never',
        categoryId: 1
      }))
    }
  },
  mounted() {
    this.$store.dispatch("getUserActs");
    // this.setEvents();
  },
  methods: {
    goToday() {
      this.$refs.calendar.goToday()
    }
  },
  components: {
    Calendar // Registering Component
  }
}
</script>