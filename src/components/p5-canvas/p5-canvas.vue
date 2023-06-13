<template>
  <div class="p5-canvas">
    <!-- {{ symages }} -->
    {{ active }}
    <p>assigned keys: a, w, e, r</p>
    <p>
      key: {{ incomingKey }} --- note: {{ incomingNote }} --- velocity: {{ incomingVelocity }} ---
      count: {{ masterClock }}
    </p>
    <div ref="p5Container" id="p5parent"></div>
    <!-- <p>{{ insertCode }}</p> -->
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
      console.log('noteTriggered', this.incomingNote)
      this.handleNote(this.incomingNote)
    }
  },
  mounted() {
    console.log('this.symages', this.symages)
    this.symages = symages
    this.initiateP5()
    this.initiateMidi()

    // ASSIGN CONTROLLER ROUTINGS?
  },
  beforeUnmount() {
    this.unmountP5()
  },
  mixins: [p5mixin, midimixin],
  props: {},
  methods: {
    handleNote(val) {
      console.log('handleNote: val', val)
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

        // reset everything:
        p.strokeWeight(0)
        // LOOP THROUGH AND RENDER
        for (let i = 0; i < this.active.length; i++) {
          this.active[i].print
          // REMOVE EXPIRED
          if (this.active[i].currentFrame > this.active[i].frames) {
            // this.active.splice(i, 1)
          } else {
            // RENDER CURRENT

            // let fillColor;
            // if (this.active[i].fill) {
            //   fillColor = this.active[i].fill;

            //   // p.fill(
            //   //   `rgba(${this.active[i].currentFrame * 5}, ${
            //   //     this.active[i].currentFrame * 5
            //   //   }, 200, 0.5)`
            //   // )
            // }
            // precode
            if (this.active[i].precode) {
              eval(this.active[i].precode)
            }

            // animation
            if (this.active[i].animation && this.active[i].animation[this.active[i].currentFrame]) {
              console.log('anim')
              console.log(this.active[i].currentFrame)
              eval(this.active[i].animation[this.active[i].currentFrame])
            }
            // XX STUFF
            if (this.active[i].xx) {
              let xxx = p.color('red')
              xxx.setAlpha(this.active[i].currentFrame * 2 + 20)

              // xxx.p.setAlpha()
              // console.log('xxx', xxx)
              p.fill(xxx)
            }

            // postcode
            if (this.active[i].postcode) {
              eval(this.active[i].postcode)
            }

            // reset for next symage:
            p.strokeWeight(0)
            // p.fill('rgba(0,0,0,0)')
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
