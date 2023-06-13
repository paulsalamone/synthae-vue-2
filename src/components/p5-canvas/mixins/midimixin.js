export default {
    data() {
        return {
            incomingKey: "",
            incomingNote: 0,
            incomingVelocity: 0,
            incomingCC: 0,
            noteTriggered: false
        }
    },
    mounted() {
        document.addEventListener('keyup', this.handleKeyUp);

    },
    beforeUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp);
    },
    methods: {
        handleKeyUp(event) {
            if (event.key === 'q') {
                console.log("q")
                this.incomingKey = 'q'
                this.incomingNote = 36,
                    this.incomingVelocity = 122
            }
            if (event.key === 'w') {
                console.log("w")
                this.incomingKey = event.key

                this.incomingNote = 37,
                    this.incomingVelocity = 125
            }
            if (event.key === 'e') {
                console.log("e")
                this.incomingKey = event.key

                this.incomingNote = 38,
                    this.incomingVelocity = 127
            }
            if (event.key === 'r') {
                console.log("r")
                this.incomingKey = event.key
                this.incomingCC = 40;
                this.incomingNote = 39,
                    this.incomingVelocity = 50
            }
            this.noteTriggered = !this.noteTriggered;
        },
        initiateMidi() {
            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure)
                console.log("MIDIAccess is supported in this browser.")
            } else {
                console.error('Web MIDI API is not supported in this browser.')
            }
        },
        onMIDISuccess(midiAccess) {
            // console.log('MIDI Access Object', midiAccess)
            const inputs = midiAccess.inputs.values()
            // console.log("MIDI Inputs", inputs)
            for (
                var input = inputs.next();
                input && !input.done;
                input = inputs.next()
            ) {
                // Attach a MIDI message event listener to the input device
                input.value.onmidimessage = this.handleMIDIMessage;
            }
        },
        handleMIDIMessage(event) {
            // console.log("MIDI Message", event)

            if (event.data.length === 3) {
                var messageType = event.data[0] & 0xf0; // Extract the message type
                var channel = event.data[0] & 0x0f; // Extract the MIDI channel

                if (messageType === 0x90) {
                    // Note On message
                    var note = event.data[1]; // Extract the note number

                    this.incomingNote = note;
                    this.noteTriggered = !this.noteTriggered;
                    var velocity = event.data[2]; // Extract the velocity
                    this.incomingVelocity = velocity

                    // Log the Note On message to the console
                    console.log(
                        "Note On - Channel:",
                        channel,
                        "Note:",
                        note,
                        "Velocity:",
                        velocity
                    );
                } else if (messageType === 0xb0) {
                    // Control Change message
                    var ccNumber = event.data[1]; // Extract the CC number
                    var ccValue = event.data[2]; // Extract the CC value

                    this.incomingCC = ccValue;
                    // Log the Control Change message to the console
                    console.log(
                        "Control Change - Channel:",
                        channel,
                        "CC Number:",
                        ccNumber,
                        "CC Value:",
                        ccValue
                    );
                }
            }

        },
        // this is some other shit: the piossible notes are: 36 - 43
        // This function is called if the MIDIAccess request fails:
        onMIDIFailure() {
            console.error('Could not access your MIDI devices.')
        }
    }
}