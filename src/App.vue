<template>
  <v-app>
    <v-app-bar
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
      >
        <v-icon left>mdi-plus</v-icon>
        <span class="mr-2">{{ $t('hero.heroAdd') }}</span>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
}
</script>
