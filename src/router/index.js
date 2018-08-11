import Vue from 'vue'
import Router from 'vue-router'
import SimpleRepeat from '@/components/SimpleRepeat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/simple-repeat',
      name: 'SimpleRepeat',
      component: SimpleRepeat
    }
  ]
})
