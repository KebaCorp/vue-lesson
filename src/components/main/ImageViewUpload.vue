<template>
  <div>

    <!--Image preview-->
    <v-hover v-slot:default="{ hover }">
      <v-card
        :class="{ 'on-hover': hover }"
        class="text-center pa-3"
        height="224px"
        width="224px"
      >
        <v-img
          v-if="value"
          :src="value"
          contain
          height="200px"
          width="200px"
        >
          <v-overlay
            :absolute="true"
            :value="hover"
            :opacity="0.8"
          >

              <!--Edit button-->
              <v-btn
                dark
                icon
                @click="toggleImageUpload = true"
                class="mr-2"
              >
                <v-icon color="white" size="x-large">mdi-pencil</v-icon>
              </v-btn>

              <!--Delete button-->
              <v-btn
                dark
                icon
                @click="onSave({ image: '' })"
                class="ml-2"
              >
                <v-icon color="white" size="x-large">mdi-delete</v-icon>
              </v-btn>

          </v-overlay>
        </v-img>
        <v-layout
          v-else
          fill-height
          @click="toggleImageUpload = true"
          class="cursor-pointer"
        >
          <v-flex class="align-self-center title white--text">
            <v-icon size="x-large">mdi-upload</v-icon>
          </v-flex>
        </v-layout>
      </v-card>
    </v-hover>

    <!--Image upload-->
    <image-upload
      v-model="toggleImageUpload"
      @onSave="onSave"
    />

    <!--Image errors-->
    <v-alert :value="!!errors.length" type="error">
      <p
        class="mt-0 mb-0"
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </p>
    </v-alert>

  </div>
</template>

<script>
const ImageUpload = () => import(/* webpackChunkName: 'ImageUpload' */ './ImageUpload')

export default {
  name: 'ImageViewUpload',
  components: {
    ImageUpload
  },
  props: {
    value: { type: String, default: '' },
    errors: { type: Array, default: () => ([]) }
  },
  data: () => ({
    toggleImageUpload: false,
    overlay: true
  }),
  methods: {
    /**
     * On save image.
     *
     * @param image
     */
    onSave ({ image }) {
      this.$emit('input', image)
    }
  }
}
</script>

<style scoped>

</style>
