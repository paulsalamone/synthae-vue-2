<template>
  <div class="p5-canvas">
    {{ symages }}
    {{ active }}
    <p>note: {{ incomingNote }}</p>
    <p>count: {{ masterClock }}</p>
    <div ref="p5Container" id="p5parent"></div>
    <p>{{ insertCode }}</p>
  </div>
</template>

<script>
import p5mixin from './mixins/p5mixin'
import midimixin from './mixins/midimixin'
import symages from './symages/symages'

export default {
  name: 'p5-canvas',
  data() {
    return {
      active: [],
      insertCode: '',
      masterClock: 0
    }
  },
  watch: {
    noteTriggered() {
      this.handleNote(this.incomingNote)
    }
  },
  mounted() {
    console.log('this.symages', this.symages)
    this.symages = symages
    this.initiateP5()
    this.initiateMidi()
  },
  beforeUnmount() {
    this.unmountP5()
  },
  mixins: [p5mixin, midimixin],
  props: {},
  methods: {
    handleNote(val) {
      this.symages.forEach((symage) => {
        if (symage.note === val) {
          this.pushToActive(symage)
        }
      })
    },
    pushToActive(symage) {
      symage.timeStamp = this.masterClock
      symage.currentFrame = 0
      this.active.push(symage)
    },
    createSketch(p) {
      p.setup = () => {
        const canvas = p.createCanvas(400, 300)
        canvas.parent('p5parent')
      }

      p.draw = () => {
        p.background('black')

        // LOOP THROUGH AND RENDER
        for (let i = 0; i < this.active.length; i++) {
          this.active[i].print
          // REMOVE EXPIRED
          if (this.active[i].currentFrame > this.active[i].frames) {
            this.active.splice(i, 1)
          } else {
            // RENDER CURRENT

            eval(this.active[i].code)

            // ITERATE
            this.active[i].currentFrame++
          }
        }

        this.masterClock++
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
