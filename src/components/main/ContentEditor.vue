<template>
  <quill-editor
    :content="value"
    :options="option"
    @change="onEditorChange($event)"
    :style="{ height: height }"
  />
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
// import { ImageResize } from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module'
import Emoji from 'quill-emoji'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import 'quill-emoji/dist/quill-emoji.css'

Quill.register('modules/imageDrop', ImageDrop)
// Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/emoji', Emoji)

export default {
  name: 'ContentEditor',
  components: {
    quillEditor
  },
  props: {
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    height: { type: String, default: '150px' }
  },
  computed: {
    option () {
      return {
        placeholder: this.$t('content.enterValue'),
        height: '400px',
        theme: 'snow',
        modules: {
          'emoji-toolbar': true,
          'emoji-textarea': false,
          'emoji-shortname': true,
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video', 'emoji']
          ],
          imageDrop: true
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // }
        }
      }
    }
  },
  methods: {
    /**
     * On change.
     *
     * @param html
     * @param text
     */
    onEditorChange ({ html, text }) {
      this.$emit('onChange', { value: html, text })
    }
  }
}
</script>

<style lang="scss">
  .ql-container {
    height: calc(100% - 67px);
  }
</style>
