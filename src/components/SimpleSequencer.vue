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
              <div v-for="(instrument, idx) in instruments">

              <el-checkbox-button
                v-model="instrument.checked"
                :key="idx"
                :label="instrument.label"
                @change="toggleInstrument(idx, $event)"
               >
              </el-checkbox-button>
            </div>
          <!-- <template v-for="instrument in instruments">
            <el-checkbox-group v-model="selectedInstrument.name">
                <el-checkbox-button
                  v-for="beat in beats"
                  :key="beat"
                  :label="beat"
                 >
                </el-checkbox-button>
            </el-checkbox-group>
        </template> -->
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

const beats = [1, 2, 3, 4, 5, 6, 7, 8]

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
      beats: beats,
      selectedInstrument: [],
      instruments: [
        { label: '1', value: 1, checked: false },
        { label: '2', value: 2, checked: false },
        { label: '3', value: 3, checked: false },
        { label: '4', value: 4, checked: false },
        { label: '5', value: 5, checked: false },
        { label: '6', value: 6, checked: false },
        { label: '7', value: 7, checked: false },
        { label: '8', value: 8, checked: false }
      ],
      // instruments: [
      //   {
      //     instrumentOne: [
      //       { name: 'instrument one', amount: 8 }
      //     ]
      //   }
      // ],
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
        this.instruments.forEach((val, i) => {
          let synth = synths[i]
          let note = notes[i]
          // let row = this.rows[i]
          // let input = row.querySelector(`input:nth-child(${step + 1})`)
          if (val.checked && (i === step)) synth.triggerAttackRelease(note, '8n', time)
        })
        this.index++
    },
    toggleInstrument (idx, e) {
      console.log(idx)
      console.log(e)
      if (e) {
        this.selectedInstrument.push(e)
      } else {
        this.selectedInstrument.slice(idx)
      }
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
