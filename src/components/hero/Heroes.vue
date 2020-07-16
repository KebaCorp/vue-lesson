<template>
  <div>
    Heroes

    <pre>
      {{ heroes }}
    </pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Heroes',
  computed: {
    ...mapGetters('heroes', [
      'heroes'
    ])
  },
  created () {
    this.$store.dispatch('heroes/setHeroes')
  }
}
</script>

<style scoped>

</style>
