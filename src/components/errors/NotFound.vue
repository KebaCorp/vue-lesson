<template>
  <v-layout row pb-5 justify-center>
    <v-flex sm12 md8 lg6>
      <v-card class="mt-10" flat>

        <!--Content-->
        <v-card-text class="text-center">

          <!--Error 404-->
          <h1 style="font-size: 150px; line-height: 150px;" class="font-weight-thin">404</h1>
          <p class="mt-10 mb-5">{{ $t('content.tryFollowingPages') }}</p>

          <!--To main page-->
          <v-btn
            text
            color="primary"
            @click="$router.push({ name: 'main' })"
          >
            {{ $t('menu.main') }}
          </v-btn>

          <br/>

          <!--Go back-->
          <v-btn
            text
            color="primary"
            @click="goBack"
            class="mt-2"
          >
            ⟵ {{ $t('content.goBack') }}
          </v-btn>

        </v-card-text>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack () {
      this.$router.go(-2)
    }
  }
}
</script>

<style scoped>

</style>
