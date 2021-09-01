<template>
  <div class='d-flex justify-content-center mt-5'>
    <half-circle-spinner
      :animation-duration="1000"
      :size='30'
      :color="'#ed4040'" 
    />
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'
export default {
  name: "CenteredLoader",
  components: { HalfCircleSpinner }
}
</script>