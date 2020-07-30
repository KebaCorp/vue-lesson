<template>
  <v-layout justify-center pt-5 pb-12>
    <v-flex xs12 sm8 md6 lg5 pb-12>
      <hero-card :hero="hero"/>
    </v-flex>
  </v-layout>
</template>

<script>
import Hero from '@/models/Hero'
import { axios } from '@/axios'
import HeroCard from './HeroCard'

export default {
  name: 'HeroView',
  components: {
    HeroCard
  },
  data: () => ({
    loading: false,
    hero: new Hero({})
  }),
  methods: {
    /**
     * Increment views of hero.
     *
     * @returns {Promise<void>}
     */
    async incrementViews () {
      this.loading = true

      try {
        const { data } = await axios.post('hero/increment-views', {
          id: this.$route.params.id
        })

        if (data && typeof data === 'object') {
          this.hero = new Hero(data)
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    }
  },
  async created () {
    await this.incrementViews()
  }
}
</script>

<style scoped>

</style>
