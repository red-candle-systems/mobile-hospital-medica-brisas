import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'
import showcase from './showcase'
import cardState from './cardState'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      global,
      showcase,
      cardState
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept(['./showcase'], () => {
      const newShowcase = require('./showcase').default
      Store.hotUpdate({ modules: { showcase: newShowcase } })
    })
  }

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./cardState'], () => {
      const newCardState = require('./cardState').default
      Store.hotUpdate({ modules: { cardState: newCardState } })
    })
  }

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./global'], () => {
      const newGlobal = require('./global').default
      Store.hotUpdate({ modules: { global: newGlobal } })
    })
  }
  return Store
}
