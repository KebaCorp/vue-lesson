<template>
  <v-layout justify-center py-12>
    <v-flex xs12 sm8 md6 lg5 pb-12>

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
              :label="$t('content.fullName')"
              :error-messages="fullNameErrors"
              clearable
              outlined
              class="mt-5"
            />

            <!--Short description-->
            <h4 class="mt-2 mb-1">{{ $t('hero.shortDescription') }}</h4>
            <content-editor
              :value="shortDescription"
              @onChange="changeShortDescription"
            />
            <error-messages :messages="shortDescriptionErrors" class="mt-2"/>

            <!--Description-->
            <h4 class="mt-10 mb-1">{{ $t('hero.description') }}</h4>
            <content-editor
              :value="description"
              @onChange="changeDescription"
            />
            <error-messages :messages="descriptionErrors" class="mt-2"/>

            <!--Create-->
            <v-btn
              block
              :disabled="$v.$invalid"
              class="mt-8"
              color="success"
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

const ContentEditor = () => import('../main/ContentEditor')
const ErrorMessages = () => import('../main/ErrorMessages')

export default {
  name: 'HeroCreate',
  components: {
    ContentEditor,
    ErrorMessages
  },
  computed: {
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      if (!this.$v.fullName.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    },
    shortDescriptionErrors () {
      const errors = []
      if (!this.$v.shortDescription.$dirty) return errors
      if (!this.$v.shortDescription.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      if (!this.$v.description.required) errors.push(this.$i18n.t('validation.required'))
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
    fullName: null,
    shortDescription: null,
    description: null
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
          fullName: this.fullName,
          shortDescription: this.shortDescription,
          description: this.description
        }
      })
    },
    changeShortDescription ({ value }) {
      this.shortDescription = value
      this.$v.shortDescription.$touch()
    },
    changeDescription ({ value }) {
      this.description = value
      this.$v.description.$touch()
    }
  },
  mixins: [validationMixin],
  validations: {
    fullName: {
      required
    },
    shortDescription: {
      required
    },
    description: {
      required
    }
  }
}
</script>

<style scoped>

</style>
