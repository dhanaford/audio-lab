import Vue from 'vue'
import Router from 'vue-router'
import SimpleRepeat from '@/components/SimpleRepeat'
import SimpleSequencer from '@/components/SimpleSequencer'
import SimpleSequencer2 from '@/components/SimpleSequencer2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/simple-repeat',
      name: 'SimpleRepeat',
      component: SimpleRepeat
    },
    {
      path: '/simple-step-sequencer',
      name: 'SimpleSequencer',
      component: SimpleSequencer
    },
    {
      path: '/simple-step-sequencer2',
      name: 'SimpleSequencer2',
      component: SimpleSequencer2
    }
  ]
})
