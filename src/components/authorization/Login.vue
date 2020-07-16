<template>
  <v-layout
    fill-height
    align-center
    justify-center
    class="gradient-background"
  >
    <v-flex
      xs12
      md5
      lg3
      class="text-center"
    >
      <v-card
        :elevation="0"
        :style="{ background: 'none' }"
      >
        <v-card-title class="white--text">{{ $t('app.name') }}</v-card-title>
        <v-card-text>
          <v-form>

            <!--Username-->
            <v-text-field
              v-model="$v.username.$model"
              :placeholder="$t('content.username')"
              solo-inverted
              dark
              :error-messages="usernameErrors"
            />

            <!--Password-->
            <v-text-field
              v-model="$v.password.$model"
              :placeholder="$t('content.password')"
              solo-inverted
              dark
              :error-messages="passwordErrors"
            />

            <!--Login-->
            <v-btn
              dark
              large
              block
              :disabled="$v.$invalid"
              @click="login"
            >
              {{ $t('content.login') }}
            </v-btn>

            <!--Login-->
            <v-btn
              dark
              large
              block
              @click="test"
            >
              test
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { axios } from '@/axios'

export default {
  name: 'Login',
  computed: {
    ...mapGetters('auth', [
      'loading',
      'token',
      'isAuthorized'
    ]),
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      if (!this.$v.username.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    }
  },
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    async login () {
      if (this.$v.$invalid) return false

      try {
        const { data } = await axios.post('authorization/login', {
          LoginForm: {
            username: this.username,
            password: this.password
          }
        })

        if (data) {
          this.$store.dispatch('auth/setToken', data.token)
          this.$router.push({ name: 'main' })
        }
      } catch (e) {
      }
    },
    async test () {
      await axios.post('closed/authorization/test')
    }
  },
  mixins: [validationMixin],
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  }
}
</script>

<style scoped>

</style>
