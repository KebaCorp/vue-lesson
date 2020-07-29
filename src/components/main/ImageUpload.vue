<template>
  <image-crop-upload
    :width="200"
    :height="200"
    :noRotate="false"
    :langExt="$t('imageCropUpload')"
    @crop-success="cropSuccess"
    field="img"
    img-format="jpg"
    :no-circle="$vuetify.breakpoint.xsOnly"
    :no-square="$vuetify.breakpoint.xsOnly"
    v-model="innerValue"
  />
</template>

<script>
import ImageCropUpload from 'vue-image-crop-upload'

export default {
  name: 'ImageUpload',
  components: {
    ImageCropUpload
  },
  props: {
    value: { type: Boolean, default: false }
  },
  computed: {
    innerValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    /**
     * On save.
     *
     * @param image
     */
    cropSuccess (image) {
      this.$emit('onSave', { image })
    }
  }
}
</script>

<style lang="scss">
  .vue-image-crop-upload {
    .vicp-wrap {
      max-width: 100vw
    }
  }
</style>
