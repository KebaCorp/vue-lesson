<template>
  <v-layout justify-center pt-5 pb-12>
    <v-flex xs12 sm8 md6 lg5 pb-12>

      <!--Breadcrumbs-->
      <v-breadcrumbs :items="breadcrumbs"/>

      <v-card
        :elevation="$vuetify.breakpoint.smAndUp ? 10 : 0"
      >
        <v-card-title>
          Heroes
        </v-card-title>
        <v-card-text>
          <pre>
            {{ heroes }}
          </pre>
        </v-card-text>

      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Heroes',
  computed: {
    ...mapGetters('heroes', [
      'heroes'
    ]),
    breadcrumbs () {
      return [
        {
          text: this.$i18n.t('menu.main'),
          disabled: true,
          to: { name: 'main' }
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('heroes/setHeroes')
  }
}
</script>

<style scoped>

</style>
