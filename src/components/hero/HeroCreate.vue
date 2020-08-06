<template>
  <v-layout justify-center pt-5 pb-12>
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

            <!--Main photo-->
            <v-flex
              mt-2
              xs12
              lg6
            >
              <h4 class="text-xs-left mb-2">{{ $t('hero.mainPhoto') }}:</h4>
              <image-view-upload
                v-model="mainPhoto"
                :errors="mainPhotoErrors"
              />
            </v-flex>

            <!--Short description-->
            <h4 class="mt-10 mb-1">{{ $t('hero.shortDescription') }}</h4>
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

            <!--Keywords-->
            <v-combobox
              v-model="keywords"
              :error-messages="keywordsErrors"
              chips
              deletable-chips
              :label="$t('content.keywords')"
              multiple
              class="mt-5"
            />

            <!--Create-->
            <v-btn
              block
              :loading="loading"
              :disabled="$v.$invalid"
              class="mt-10"
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
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Hero from '@/models/Hero'

const ContentEditor = () => import('../main/ContentEditor')
const ErrorMessages = () => import('../main/ErrorMessages')
const ImageViewUpload = () => import('@/components/main/ImageViewUpload')

export default {
  name: 'HeroCreate',
  components: {
    ContentEditor,
    ErrorMessages,
    ImageViewUpload
  },
  computed: {
    ...mapGetters('heroes', [
      'loading'
    ]),
    fullNameErrors () {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      if (!this.$v.fullName.required) errors.push(this.$i18n.t('validation.required'))
      return errors
    },
    mainPhotoErrors () {
      const errors = []
      if (!this.$v.mainPhoto.$dirty) return errors
      if (!this.$v.mainPhoto.required) errors.push(this.$i18n.t('validation.required'))
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
    keywordsErrors () {
      const errors = []
      if (!this.$v.keywords.$dirty) return errors
      if (!this.$v.keywords.required) errors.push(this.$i18n.t('validation.required'))
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
    mainPhoto: null,
    shortDescription: null,
    description: null,
    keywords: []
  }),
  methods: {
    /**
     * Create hero.
     *
     * @returns {boolean}
     */
    create () {
      if (this.$v.$invalid) return false

      const hero = new Hero({
        fullName: this.fullName,
        mainPhoto: this.mainPhoto,
        shortDescription: this.shortDescription,
        description: this.description,
        keywords: this.keywords
      })

      this.$store.dispatch('heroes/create', { hero })
        .then(() => {
          this.clearForm()
        })
    },
    changeShortDescription ({ value }) {
      this.shortDescription = value
      this.$v.shortDescription.$touch()
    },
    changeDescription ({ value }) {
      this.description = value
      this.$v.description.$touch()
    },
    clearForm () {
      this.fullName = null
      this.mainPhoto = null
      this.shortDescription = null
      this.description = null
      this.keywords = []
      this.$v.$reset()
    }
  },
  mixins: [validationMixin],
  validations: {
    fullName: {
      required
    },
    mainPhoto: {
      required
    },
    shortDescription: {
      required
    },
    description: {
      required
    },
    keywords: {
      required
    }
  }
}
</script>

<style scoped>

</style>
