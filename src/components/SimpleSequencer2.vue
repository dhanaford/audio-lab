<template>
  <div>

    <el-select
      v-model="currentSynth" placeholder="Select Synthesizer type"
      @change="initSynth($event)">
      <el-option v-for="(synth, index) in synthType" 
        :key="index"
        :label="synth.name"
        :value="synth.name">
      </el-option>
    </el-select>
    <div ref="synth">
      <el-row :gutter="10">
        <el-col :span="8" data-id="dial" id="freq"></el-col>
        <el-col :span="8" data-id="dial" id="volume"></el-col>
        <el-col :span="8" data-id="dial" id="mod"></el-col>
      </el-row>
    </div>
    <!-- <div ref="dial"></div> -->
    <div ref="piano"></div>
    <div ref="volume"></div>
    <div ref="sequencer"></div>
</div>
</template>
<script>
import Tone from 'tone'
import Nexus from 'nexusUI'

export default {
  name: 'SimpleSequencer2',
  data () {
    return {
      currentSynth: 'Synth',
      synthType: [
        {
          name: 'Synth',
          properties: {
            oscillator: {
              type: 'triangle'
            },
            envelope: {
              attack: 0.005,
              decay: 0.1,
              sustain: 0.3,
              release: 1
            }
          }
        },
        {
          name: 'AMSynth',
          properties: {
            harmonicity: 3,
            detune: 0,
            oscillator: {
              type: 'sine'
            },
            envelope: {
              attack: 0.01,
              decay: 0.01,
              sustain: 1,
              release: 0.5
            },
            modulation: {
              type: 'square'
            },
            modulationEnvelope: {
              attack: 0.5,
              decay: 0,
              sustain: 1,
              release: 0.5
            }
          }
        },
        {
          name: 'FMSynth', 
          properties: {
            harmonicity: 3,
            modulationIndex: 10,
            detune: 0,
            oscillator: {
              type: 'sine'
            },
            envelope: {
              attack: 0.01,
              decay: 0.01,
              sustain: 1,
              release: 0.5
            },
            modulation: {
              type: 'square'
            },
            modulationEnvelope: {
              attack: 0.5,
              decay: 0,
              sustain: 1,
              release: 0.5
            }
          }
        }
      ],
      gain: new Tone.Gain(0.7),
      tick: 0,
      dials: [
        {name: 'dial', value: 'dial1'},
        {name: 'dial2', value: 'dial2'},
        {name: 'dial3', value: 'dial3'}
      ]
    }
  },
  mounted () {
    this.gain.toMaster()
    console.log('refs: ' + this.$refs)

    let dial = new Nexus.Rack(this.$refs.synth, {
      attribute: 'data-id'
    })
    console.log(dial)
    let volume = new Tone.Gain().toMaster()
    let masterVolume = new Nexus.Slider(this.$refs.volume, {
      size: [120, 20],
      mode: 'relative',
      min: 0,
      max: 1,
      step: 0,
      value: 0
    })
    masterVolume.on('change', function (v) {
      console.log('v: ' + v)
      volume = v
      // console.log('volume change ' + volume)
    })
    synth = new Tone[this.currentSynth]().toMaster()

  },
  methods: {
    playKey (v) {
      // synth
    },
    initSynth (v) {
      // let currentSynth  = v
      // console.log(v)
      synth = new Tone[this.currentSynth]().toMaster()
      console.log(synth)
      let piano = new Nexus.Piano(this.$refs.piano, {
        'size': [400, 200],
        'mode': 'toggle',
        'rows': 5,
        'columns': 10
      })
      piano.on('change', function (v) {
        console.log(v.note)
        synth.triggerAttackRelease(v.note, '8N')
      })
      // if (this.synth) {
      //   this.synth.disconnect(this.gain)
      // }
    let synth = synth.toMaster()
    }
  },
  computed: {
    // masterVolume: {
    //   get () {
    //     return new Tone.Volume().toMaster()
    //   },
    //   set (v) {
    //     volume.volume = v
    //   }
    // },
    slider () {
      return new Nexus.Dial()
    }
  }
}
</script>

<style scoped>
#power {
  width:40px;
  height:17px;
  margin:15px 0px;
}

#echo {
  width:200px;
  height:20px;
  margin:5px 3px;
}
</style>
