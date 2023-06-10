export default {
    data() {
        return {
        }
    },

    methods: {
        initiateP5() {
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
        setupP5() {
            new p5(this.createSketch, this.$refs.p5Container)
        },
        unmountP5() {
            const p5Container = this.$refs.p5Container
            while (p5Container.firstChild) {
                p5Container.firstChild.remove()
            }
        }
    }

}