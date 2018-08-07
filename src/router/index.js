import Vue from 'vue'
import Router from 'vue-router'
import Audio from '@/components/audio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Audio',
      component: Audio
    }
  ]
})
