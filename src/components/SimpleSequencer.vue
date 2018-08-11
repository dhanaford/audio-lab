<template>
  <span>
    <select
      v-model="state.selectedSynth">
        <option
          :key="index"
          :selected="state.selectedSyth"
          v-for="(synth, index) in state.synth">
            {{synth}}
        </option>
      </select>
    <div class="instrument">
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
    </div>
    <div class="instrument">
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
    </div>
    <div class="instrument">
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
      <input type="checkbox" />
    </div>
    <div>
      <label>Increase Tempo</label>
      <br>
      <input :value="state.tempo + ' bpm'" type="text" readonly="true">
      <br>
      <input
        v-model.number="state.tempo"
        @change="changeTempo"
        type="range" min="0" max="192" step="1">
    </div>
</span>
</template>
<script>
import Tone from 'tone'

const synths = [
  new Tone.Synth(),
  new Tone.Synth(),
  new Tone.Synth()
]

// get each instrument
const notes = ['G5', 'E4', 'C3']
const gain = new Tone.Gain(0.5)
gain.toMaster()

// set each synth to its own oscillator
synths[0].oscillator.type = 'triangle'
synths[1].oscillator.type = 'sine'
synths[2].oscillator.type = 'sawtooth'

synths.forEach(synth => synth.toMaster())

export default {
  name: 'SimpleSequencer',
  data () {
    return {
      index: 0,
      state: {
        tempo: 90,
        indicator: false,
        synth: ['Synth', 'AMSynth', 'FMSynth'],
        selectedSynth: 'Select Synth'
      }
    }
  },
  mounted () {
    // connect each synth to amplifier
    Tone.Transport.scheduleRepeat(this.repeat, '8n')
    Tone.Transport.start()
  },
  methods: {
    repeat (time) {
      let step = this.index % 8 // amount of columns we have
      if (step === this.index) {
        this.state.indicator = true
      }
      this.rows.forEach((val, i) => {
        let synth = synths[i]
        let note = notes[i]
        let row = this.rows[i]
        let input = row.querySelector(`input:nth-child(${step + 1})`)
        if (input.checked) synth.triggerAttackRelease(note, '8n', time)
      })
      this.index++
    },
    changeTempo () {
      Tone.Transport.bpm.value = this.state.tempo
    }
  },
  computed: {
    rows () {
      let rows = document.querySelectorAll('.instrument')
      return rows
    },
    indicatorPosition () {
      return Tone.Transport.scheduleRepeat(this.repeat, '8n')
    }
  }
}
</script>

<style scoped>
  .actve {
    background-color: red;
  }
</style>
