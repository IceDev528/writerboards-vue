<template>
  <div id="auto-complete">
    <input ref="autocomplete" 
        placeholder="Enter a Location" 
        class="search-location"
        onfocus="value = ''" 
        type="text"
         />
  </div>
</template>

<script>
export default {
  name: 'LocationAutoForm',
  props: [
    'location'
  ],
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    );
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      let lat = place.geometry.location.lat();
      let lon = place.geometry.location.lng();
      this.$store.dispatch("setLocation", place);

      console.log('address entered is', place.formatted_address);
      console.log('latitude entered is', place.geometry.location.lat());

        // v-on:input="(event) => this.$emit('inputChange', event)" - from form input above
    });
  },
  methods: {
  }
}
</script>

