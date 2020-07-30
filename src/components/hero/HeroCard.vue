<template>
  <v-card>

    <!--Main photo-->
    <v-img v-if="hero.getMainPhoto()" :src="hero.getMainPhoto()"/>

    <!--Full name-->
    <v-card-title>
      {{ hero.getFullName() }}
    </v-card-title>

    <!--Description-->
    <v-card-text class="quill-editor" v-html="hero.getDescription()"/>

    <!--Views-->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon class="mr-1">mdi-eye</v-icon>
      <span class="subheading mr-2">{{ hero.getViews() }}</span>
    </v-card-actions>

  </v-card>
</template>

<script>
import Hero from '@/models/Hero'

export default {
  name: 'HeroCard',
  props: {
    hero: { type: Hero, required: true }
  }
}
</script>

<style scoped>

</style>
