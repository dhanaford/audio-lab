<template>
  <div>
    <div ref="target" id="test"></div>
    <canvas nx="matrix"></canvas>
</div>
</template>
<script>
import Tone from 'tone'
import Interface from 'interface'
import $ from 'jquery'
import Nexus from 'nexusUI'
// let $ = JQuery

let synth = new Tone.Synth().toMaster()

// var sequencer = new Nexus.Sequencer()



export default {
  name: 'SimpleSequencer2',
  data () {
    return {
      button: null
    }
  },
  mounted () {
    var piano = new Nexus.Piano(this.$refs.target, {
      'size': [400, 200],
      'mode': 'button',
      'rows': 24,
      'columns': 60,
      'lowNote': 44,
      'highNote': 80
    })
    piano.on('change', function (v) {
      console.log(v.note)
      synth.triggerAttackRelease(v.note, '8N')
    })
    // nx.colorize('#f5871f')
    // matrix1.col = 16
    // matrix1.init()
    // // matrix1.resize($("#Content").width(), 250)
    // matrix1.draw()
  },
  methods: {
    playKey (v) {
      // synth
    }
  },
  computed: {
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
