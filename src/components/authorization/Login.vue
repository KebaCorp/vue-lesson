<template>
  <v-layout
    fill-height
    align-center
    justify-center
  >
    <v-flex
      xs12
      md5
      lg3
      class="text-center"
    >
      <v-card

      >
        <v-card-title>{{ $t('app.name') }}</v-card-title>
        <v-card-text>
          <v-form>

            <!--Username-->
            <v-text-field
              v-model="$v.username.$model"
              :placeholder="$t('content.username')"
              solo-inverted
              :error-messages="usernameErrors"
            />

            <!--Password-->
            <v-text-field
              v-model="$v.password.$model"
              :placeholder="$t('content.password')"
              solo-inverted
              :error-messages="passwordErrors"
            />

            <!--Login-->
            <v-btn
              block
              :disabled="$v.$invalid"
              @click="login"
            >
              {{ $t('content.login') }}
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { axios } from '@/axios'

export default {
  name: 'Login',
  computed: {
    loading () {
      return this.$store.getters['auth/loading']
    },
    token () {
      return this.$store.getters['auth/token']
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      if (!this.$v.username.required) errors.push('dfdsfsdf')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) errors.push('dfdsfsdf')
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

      const { data } = await axios.post('authorization/login', {
        LoginForm: {
          username: this.username,
          password: this.password
        }
      })

      if (data) {
        this.$store.dispatch('auth/setToken', data.token)
      }
      console.log(123)
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
