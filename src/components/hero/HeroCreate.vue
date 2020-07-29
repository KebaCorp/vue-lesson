<template>
  <v-layout justify-center pt-12>
    <v-flex xs12 sm8 md6 lg5>

      <!--Breadcrumbs-->
      <v-breadcrumbs :items="breadcrumbs"/>

      <v-card
        :elevation="$vuetify.breakpoint.smAndUp ? 10 : 0"
      >
        <v-card-title>
          {{ $t('hero.heroAdd') }}
        </v-card-title>
        <v-card-text>
          <v-form>

            <!--Full name-->
            <v-text-field
              v-model="$v.fullName.$model"
              :placeholder="$t('content.fullName')"
              :error-messages="fullNameErrors"
              clearable
              outlined
            />

            <!--Create-->
            <v-btn
              block
              :disabled="$v.$invalid"
              @click="create"
            >
              {{ $t('content.add') }}
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

export default {
  name: 'HeroCreate',
  computed: {
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      if (!this.$v.fullName.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    },
    breadcrumbs () {
      return [
        {
          text: this.$i18n.t('menu.main'),
          disabled: false,
          to: { name: 'main' }
        },
        {
          text: this.$i18n.t('menu.heroCreate'),
          disabled: true,
          to: { name: 'heroCreate' }
        }
      ]
    }
  },
  data: () => ({
    fullName: null
  }),
  methods: {
    /**
     * Create hero.
     *
     * @returns {boolean}
     */
    create () {
      if (this.$v.$invalid) return false

      this.$store.dispatch('heroes/create', {
        Hero: {
          fullName: this.fullName
        }
      })
    }
  },
  mixins: [validationMixin],
  validations: {
    fullName: {
      required
    }
  }
}
</script>

<style scoped>

</style>
