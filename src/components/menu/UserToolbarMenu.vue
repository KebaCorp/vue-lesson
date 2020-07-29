<template>
  <v-menu
    offset-y
    :close-on-content-click="true"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        slot="activator"
        icon
        v-on="on"
      >
        <v-avatar
          :size="37"
          color="grey lighten-4"
        >
          <v-img :src="$t('app.defaultUserImage')" :alt="$t('content.avatar')"/>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>

      <!--Logout-->
      <v-list-item @click="logout">
        <v-list-item-action>
          <v-icon color="primary">mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ $t('content.logout') }}</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'UserToolbarMenu',
  methods: {
    /**
     * Logout.
     */
    logout () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>

<style scoped>

</style>
