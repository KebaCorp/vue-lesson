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
          <v-form
            @submit="login"
            class="authorization-form"
          >

            <!--Username-->
            <v-text-field
              v-model="$v.username.$model"
              :placeholder="$t('content.username')"
              solo-inverted
              dark
              type="text"
              :error-messages="usernameErrors"
            />

            <!--Password-->
            <v-text-field
              v-model="$v.password.$model"
              :placeholder="$t('content.password')"
              solo-inverted
              dark
              type="password"
              :error-messages="passwordErrors"
            />

            <!--Login-->
            <v-btn
              :disabled="$v.$invalid"
              dark
              text
              type="submit"
              block
              :loading="loading"
              outlined
              large
              @click.prevent="login"
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
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

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

      this.$store.dispatch('auth/login', {
        LoginForm: {
          username: this.username,
          password: this.password
        }
      })
        .then(result => {
          if (result) {
            this.$router.push({ name: 'main' })
          }
        })
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

<style lang="scss">
  .authorization-form {
    .v-input__slot {
      background-color: #566267 !important;
    }

    .v-input--is-focused .v-input__slot {
      background-color: #ffffff !important;
    }

    .v-text-field__slot input {
      box-shadow: inset 0 0 0 50px #566267;
      -webkit-box-shadow: inset 0 0 0 50px #566267;
      color: #ffffff;
      -webkit-text-fill-color: #ffffff;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }

    .v-text-field__slot input:focus {
      box-shadow: inset 0 0 0 50px #ffffff;
      -webkit-box-shadow: inset 0 0 0 50px #ffffff;
      color: #111111;
      -webkit-text-fill-color: #111111;
    }
  }
</style>
