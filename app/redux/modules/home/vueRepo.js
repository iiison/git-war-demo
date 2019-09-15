import { makeRepoReducer } from './home'

const {
  fetchVueDetails,
  actions : {
    getVue,
    getVueSuccess,
    getVueFailure,
  },
  reducer : vueRepo,
} = makeRepoReducer({
  name : 'Vue',
  path : 'vuejs/vue'
})

export {
  getVue,
  getVueSuccess,
  getVueFailure,
  fetchVueDetails
}

export default vueRepo

