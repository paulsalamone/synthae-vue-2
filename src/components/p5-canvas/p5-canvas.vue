<template>
  <div class="p5-canvas">
    <p>note: {{ incomingNote }}</p>
    <p>count: {{ masterClock }}</p>
    <div ref="p5Container" id="p5parent"></div>
    <p>{{ insertCode }}</p>
  </div>
</template>

<script>
import p5mixin from './mixins/p5mixin'
import midimixin from './mixins/midimixin'
export default {
  name: 'p5-canvas',
  data() {
    return {
      symages: [
        {
          id: 1,
          name: 'kevin',
          note: 36,
          frames: 10,
          code: `
          p.fill(255, 0, 0);
          p.textSize(20);
          p.text(this.masterClock, 50, 250);
          p.circle(100,100,100);
          `
        },
        {
          id: 2,
          name: 'bill',
          note: 37,
          frames: 20,
          code: `
          p.fill(0, 255, 0)
          p.circle(200,200,100)
          `
        }
      ],
      runningSymages: [],
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
      console.log('handleNote')

      // this will iterate through the list of SYMAGES and find the one that matches the incoming note
      this.symages.forEach((symage) => {
        if (symage.note === val) {
          console.log('symage:', symage.note)
          this.assignCode(symage.code, symage.frames)
          // this sends the symage code and the
        }
      })
    },
    assignCode(code, frames) {
      console.log(frames)
      const timeStamp = this.masterClock

      this.insertCode += `
      if(this.masterClock - ${timeStamp} < ${frames}){
        ${code};
      }

       
      `
      // each step it iterates
      // how to account for decays or fadeouts?! how to do multi-frame animation?
    },
    createSketch(p) {
      p.setup = () => {
        const canvas = p.createCanvas(400, 300)
        canvas.parent('p5parent')
      }

      p.draw = () => {
        p.background('black')

        // maybe here it has to check some kind of "insert bus"?
        p.textSize(32) // set the size of the text
        p.fill('orange') // set the color of the text to black
        p.text(`Hello, world! ${Math.random()}`, 50, 50) // display the text at position (50, 50)
        eval(this.insertCode)
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
