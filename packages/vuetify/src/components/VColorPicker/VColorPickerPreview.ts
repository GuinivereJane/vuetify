// Components
import VSlider from '../VSlider/VSlider'

// Utilities
import { HSVA, RGBA, RGBtoCSS, RGBAtoCSS, RGB } from '../../util/colorUtils'

// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'v-color-picker-preview',

  props: {
    alpha: Number,
    color: Array as PropValidator<HSVA>,
    rgba: Array as PropValidator<RGBA>,
    hue: Number
  },

  methods: {
    genAlpha (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__alpha',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.alpha,
          step: 0.01,
          min: 0,
          max: 1
        },
        style: {
          backgroundImage: `linear-gradient(to right, transparent, ${RGBtoCSS(this.rgba.slice(0, -1) as RGB)})`
        },
        on: {
          input: (val: number) => this.$emit('update:alpha', val)
        }
      })
    },
    genColor (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__color'
      }, [
        this.genHue(),
        this.genAlpha()
      ])
    },
    genDot (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__dot'
      }, [
        this.$createElement('div', {
          staticClass: 'v-color-picker__dot-background'
        }),
        this.$createElement('div', {
          staticClass: 'v-color-picker__dot-foreground',
          style: {
            background: RGBAtoCSS(this.rgba)
          }
        })
      ])
    },
    genHue (): VNode {
      return this.genTrack({
        staticClass: 'v-color-picker__hue',
        props: {
          thumbColor: 'grey lighten-2',
          hideDetails: true,
          value: this.hue,
          step: 0,
          min: 0,
          max: 360
        },
        on: {
          input: (val: number) => this.$emit('update:hue', val)
        }
      })
    },
    genTrack (options: object): VNode {
      return this.$createElement(VSlider, {
        class: 'v-color-picker__track',
        ...options
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__preview'
    }, [
      this.genDot(),
      this.genColor()
    ])
  }
})