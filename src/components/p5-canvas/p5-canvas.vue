<template>
  <div class="p5-canvas">
    <div ref="p5Container" id="p5parent"></div>
  </div>
</template>

<script>
import p5mixin from './p5mixin'
export default {
  name: 'p5-canvas',
  data() {
    return {}
  },
  mixins: [p5mixin],
  props: {},
  methods: {
    createSketch(p) {
      p.setup = () => {
        const canvas = p.createCanvas(400, 300)
        canvas.parent('p5parent')
      }

      p.draw = () => {
        p.background(51)
      }
    }
  }
}
</script>

<style >
.p5-canvas {
  border: 2px solid black;
  display: inline-block;
  max-width: fit-content;
}

#p5parent {
  width: 400px;
  height: 300px;
  border: 3px solid white;
  box-sizing: content-box;
}
</style>
