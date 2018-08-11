import Vue from 'vue'
import Router from 'vue-router'
import SimpleRepeat from '@/components/SimpleRepeat'
import SimpleSequencer from '@/components/SimpleSequencer'

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
    }
  ]
})
