<template>
  <div>
    <input type="checkbox" @click="togglePlay">Play/Pause<br>
  </div>
</template>

<script>
import Tone from 'tone'
export default {
  name: 'HelloWorld',
  data () {
    return {
      index: 0,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.synth = new Tone.Synth()
    this.gain = new Tone.Gain(0.9)
    this.notes = ['C4', 'D4', 'E4', '0', 'C4', 'D4', 'E4', '0', 'C5', 'D5', 'E5', '0']
    this.synth.oscillator.type = 'sine'
    this.gain.toMaster()
    this.synth.connect(this.gain)
    Tone.Transport.scheduleRepeat(time => {
      let note = this.notes[this.index % this.notes.length]
      this.synth.triggerAttackRelease(note, '8n', time)
      this.index++
    }, '8n')

    Tone.Transport.bpm.value = 90
  },
  methods: {
    togglePlay (e) {
      console.log(e)
      if (e.target.checked) {
        Tone.Transport.start('+0.3')
      } else {
        Tone.Transport.stop()
      }
    }
  }
}
</script>

<style scoped>

</style>
