<template>
  <el-row>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="8">
        <el-select
          v-model="state.selectedSynth"
          placeholder="Change Synth">
          <el-option
            v-for="synth in state.synth"
            :value="synth.value"
            :label="synth.label"
            :checked="synth.checked"
            :key="synth.value">{{synth.label}}
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <div class="instrument">
          <!-- <el-radio-group v-model="instrument.name">
              <el-radio-button
                v-for="instrument in instruments"
                :index="instrument"
                :label="instrument.value"
               >
              </el-radio-button>
          </el-radio-group> -->
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
        </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="center" :gutter="20">
    <el-col :span="8">
      <el-select
        v-model="state.selectedSynth"
        placeholder="Change Synth">
        <el-option
          v-for="synth in state.synth"
          :value="synth.value"
          :label="synth.label"
          :key="synth.value">{{synth.label}}
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="10">
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
    </el-col>
  </el-row>
  <el-row type="flex" justify="center" :gutter="20">
    <el-col :span="8">
      <el-select
        v-model="state.selectedSynth"
        placeholder="Change Synth">
        <el-option
          v-for="synth in state.synth"
          :value="synth.value"
          :label="synth.label"
          :key="synth.value">{{synth.label}}
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="10">
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
    </el-col>
  </el-row>
  <el-row type="flex" justify="center" :gutter="20">
    <el-col :span="6">
      <label>Increase Tempo</label>
      <template>
        <div class="block">
          <el-slider
            v-model.number="state.tempo"
            :min="0" :max="192"
            >
          </el-slider>
        </div>
      </template>
    </el-col>
    <el-col :span="4">
    <el-input-number
      v-model.number="state.tempo"
      :min="0"
      :max="192"
      size="small"
      @change="changeTempo">
      </el-input-number>
      <label>BPM</label>
    </el-col>
  </el-row>
</el-row>
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
      instrument: {
        name: 0
      },
      instruments: [
        { label: '', value: 1, checked: '' },
        { label: '', value: 2, checked: '' },
        { label: '', value: 3, checked: '' },
        { label: '', value: 4, checked: '' }
      ],
      state: {
        tempo: 90,
        indicator: false,
        synth: [
          { label: 'Synth', value: 'Synth' },
          { label: 'AMSynth', value: 'AMSynth' },
          { label: 'FMSynth', value: 'FMSynth' }
        ],
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
      // if (step === this.index) {
      //   this.state.indicator = true
      // }
      // let input = this.instrument.name
      this.rows.forEach((val, i) => {
        let synth = synths[i]
        let note = notes[i]
        let row = this.rows[i]
        let input = row.querySelector(`input:nth-child(${step + 1})`)
        // let input = this.instruments.label
        // if (input || input === 0) {
        //   if (input === step) synth.triggerAttackRelease(note, '8n', time)
        // }
        if (input.checked) synth.triggerAttackRelease(note, '8n', time)
      })
      this.index++
    },
    toggleInstrument (e) {
      console.log(e)
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
  .el-select {
    float: right;
  }
</style>
