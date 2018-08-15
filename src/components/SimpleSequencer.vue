<template>
  <el-row>
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <el-button
          type="success"
          v-model="state.play"
          @click="start(state.play)"
          plain>{{state.play}}
        </el-button>
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
            :checked="synth.checked"
            :key="synth.value">{{synth.label}}
          </el-option>
        </el-select>
      </el-col>
      <div class="indicator" :class="{active: state.indicator}"></div>
      <el-col :span="10">
        <template v-for="(sound, idx) in instruments[0]">
          <el-checkbox-button
            
            v-model="sound.checked"
            :key="idx"
            :label="sound.label"
            @change="toggleInstrument(idx, $event)">
          </el-checkbox-button>
        </template>
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
            :checked="synth.checked"
            :key="synth.value">{{synth.label}}
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <template v-for="(soundTwo, idx2) in instruments[1]">
          <el-checkbox-button
            v-model="soundTwo.checked"
            :key="idx2"
            :label="soundTwo.label"
            @change="toggleInstrument(idx2, $event)">
          </el-checkbox-button>
        </template>
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
        <template v-for="(soundThree, idx3) in instruments[2]">
          <el-checkbox-button
            v-model="soundThree.checked"
            :key="idx3"
            :label="soundThree.label"
            @change="toggleInstrument(idx3, $event)">
          </el-checkbox-button>
        </template>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :span="6">
        <label>Increase Tempo</label>
        <template>
          <div class="block">
            <el-slider
              v-model="state.tempo"
              :min="0" :max="192"
              @change="changeTempo"
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
      selectedInstrument: [],
      instruments: {
        0: [
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false }
        ],
        1: [
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false }
        ],
        2: [
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false },
          { label: ' ', checked: false }
        ]
      },
      state: {
        tempo: 90,
        play: 'start',
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
  },
  methods: {
    repeat (time) {
      let step = this.index % 8 // amount of columns we have
      // if (step === this.index) {
      //   this.state.indicator = true
      // }
      for (const [key, value] of Object.entries(this.instruments)) {
        let synth = synths[key]
        let note = notes[key]
        value.forEach((i, val) => {
          console.log(val)
          if (val === step) {
            // console.log(true)
            this.state.indicator = true
          } else {
            this.state.indicator = false
          }
          if (i.checked && (val === step)) synth.triggerAttackRelease(note, '8n', time)
        })
      }
      this.index++
    },
    toggleInstrument (idx, e) {
      if (e) {
        this.selectedInstrument.push(e)
      } else {
        this.selectedInstrument.slice(idx)
      }
    },
    changeTempo () {
      Tone.Transport.bpm.value = this.state.tempo
    },
    start (val) {
      // connect each synth to amplifier
      Tone.Transport.scheduleRepeat(this.repeat, '8n')
      if (val === 'start') {
        this.state.play = 'stop'
        Tone.Transport.start()
      } else {
        this.state.play = 'start'
        Tone.Transport.stop()
      }
    }
  },
  computed: {
    indicatorPosition () {
      return Tone.Transport.scheduleRepeat(this.repeat, '8n')
    }
  }
}
</script>

<style scoped>
  .indicator {
    position: relative;
    top: 0;
    left: 0;
    width: 10px;
  }
  .active {
    background-color: red;
  }
  .el-select {
    float: right;
  }
</style>
