<template>
  <div>
    <div ref="p5Container"></div>
  </div>
</template>

<script>
export default {
  name: 'P5Canvas',
  data() {
    return {
      midiAccess: null,
      midiDeviceName: null,
      circleVisible: false
    }
  },
  props: {
    param: {
      type: Number,
      default: 50
    }
  },

  mounted() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure)
    } else {
      console.error('Web MIDI API is not supported in this browser.')
    }

    console.log('param on mounted', this.param)
    const scriptP5 = document.createElement('script')
    scriptP5.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js'
    scriptP5.async = true
    scriptP5.onload = () => {
      const scriptP5Sound = document.createElement('script')
      scriptP5Sound.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.js'
      scriptP5Sound.async = true
      scriptP5Sound.onload = this.setupP5
      document.body.appendChild(scriptP5Sound)
    }
    document.body.appendChild(scriptP5)
  },
  beforeUnmount() {
    const p5Container = this.$refs.p5Container
    while (p5Container.firstChild) {
      p5Container.firstChild.remove()
    }
  },
  watch: {
    circleVisible(val) {
      console.log('circleVisible', val)
    }
  },
  methods: {
    // setupP5() {
    //   new p5(this.createSketch, this.$refs.p5Container)
    // },
    createSketch(p) {
      p.setup = () => {
        p.createCanvas(300, 300)

        // Create an oscillator and set its type to 'sawtooth'
        osc = new p5.Oscillator('sawtooth')
        osc.amp(0)
      }

      let count = 0

      p.draw = () => {
        p.background(51)

        if (this.circleVisible & (count < 30)) {
          triggerSynth()
          console.log(count)
          if (count < 10) {
            p.fill(255)
            p.circle(p.width / 2, p.height / 2, this.param)
          }

          if (count > 10 && count < 20) {
            p.fill('yellow')
            p.circle(p.width / 2, p.height / 2 + 20, this.param / 1.5)
          }

          if (count > 20) {
            p.fill('red')
            p.circle(p.width / 2, p.height / 2 + 50, this.param / 2.5)
            this.circleVisible = false
            osc.stop()
            osc.amp(0)
          }

          count++
          count > 30 ? (count = 0) : null
        }
      }

      function triggerSynth() {
        // this.circleVisible = true
        console.log('triggerSynth')
        osc.amp(0.5)
        osc.freq(this.param * 2)
        osc.start()
      }

      p.keyPressed = () => {
        console.log('pressed')
        count = 0
        if (p.key === 'a') {
          this.circleVisible = true
          //   osc.freq(this.param) // C2 frequency
          osc.amp(0.5)
          osc.freq(this.param * 2)
          osc.start()
        }
      }

      p.keyReleased = () => {
        console.log('released')
        if (p.key === 'a') {
          //   circleVisible = false
          osc.stop()
          osc.amp(0)
        }
      }
    },
    onMIDISuccess(midiAccess) {
      this.midiAccess = midiAccess
      const inputs = midiAccess.inputs.values()
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = this.onMIDIMessage
        this.midiDeviceName = input.value.name
      }
    },
    onMIDIFailure(error) {
      console.error('Failed to access MIDI devices:', error)
    },
    onMIDIMessage(message) {
      const [status, note, velocity] = message.data
      console.log('Received MIDI message:', status, note, velocity)

      if (note === 40) {
        console.log('note 40')
        this.circleVisible = true
      }
      // Do something with the MIDI data, e.g., trigger a sound or update the UI
    }
  }
}
</script>

<style scoped>
div {
  background-color: #333;
}
</style>
