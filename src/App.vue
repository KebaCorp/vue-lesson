<template>
  <v-app>

    <!--App bar-->
    <v-app-bar
      v-if="this.$route.name !== 'login'"
      app
      color="primary"
      dark
    >

      <!--App name-->
      <v-toolbar-title
        @click="$router.push({ name: 'main' })"
        class="cursor-pointer"
      >
        {{ $t('app.name') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--Add hero-->
      <v-btn
        color="success"
        :to="{ name: 'heroCreate' }"
        class="mr-2"
      >
        <v-icon left>mdi-plus</v-icon>
        <span class="mr-2">{{ $t('hero.heroAdd') }}</span>
      </v-btn>

      <!--User toolbar menu-->
      <user-toolbar-menu v-if="isAuthorized"/>

    </v-app-bar>

    <!--Content-->
    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

const UserToolbarMenu = () => import('@/components/menu/UserToolbarMenu')

export default {
  name: 'App',
  components: {
    UserToolbarMenu
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthorized'
    ])
  }
}
</script>
