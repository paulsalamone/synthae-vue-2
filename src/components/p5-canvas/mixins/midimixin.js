export default {
    data() {
        return {
            incomingNote: 0,
            noteTriggered: false
        }
    },
    methods: {
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