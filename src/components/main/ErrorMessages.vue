<template>
  <v-alert
    v-if="messages.length"
    type="error"
  >
    <div
      v-for="(message, index) in messages"
      :key="index"
    >
      {{ message }}
    </div>
  </v-alert>
</template>

<script>
export default {
  name: 'ErrorMessages',
  props: {
    messages: { type: Array, default: () => ([]) }
  }
}
</script>

<style scoped>

</style>
