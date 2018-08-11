<template>
  <div>
    <h1>A simple repeating sequence of notes</h1>
    <label>Start / Stop</label>
    <br>
    <input
    v-model="playValue"
    @click="togglePlay"
    type="checkbox" />
  </div>
</template>

<script>
import Tone from 'tone'

const synth = new Tone.Synth()
synth.oscillator.type = 'sine'

// connect to gain
const gain = new Tone.Gain(0.1)

const notes = [
  'C4', 'E4', 'G4', 'B4',
  'C5', 'E5', 'G5', 'B5'
]

// plug into amplifier
synth.toMaster()
gain.toMaster()
synth.connect(gain)

export default {
  name: 'SimpleRepeat',
  data () {
    return {
      index: 0,
      playValue: null
    }
  },
  mounted () {
    // Play a note for a period of time and kill itself when its done
    Tone.Transport.scheduleRepeat(time => {
      this.repeat(time)
    }, '8n')

    Tone.Transport.bpm.value = 90

    // setTimeout(() => {
    //   Tone.Transport.stop()
    // }, 5000)
  },
  methods: {
    repeat (time) {
      let note = notes[this.index % notes.length]
      synth.triggerAttackRelease(note, '8n', time)
      this.index++
    },
    togglePlay (e) {
      !this.playValue === true ? Tone.Transport.start() : Tone.Transport.stop()
    }
  }
}
</script>

<style scoped>

</style>
