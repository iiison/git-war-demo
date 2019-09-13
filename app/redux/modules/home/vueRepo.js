import { makeRepoReducer } from './home'

const {
  fetchVueDetails,
  actions : {
    FETCH_VUE_DETAILS,
    FETCH_VUE_DETAILS_SUCCESS,
    FETCH_VUE_DETAILS_FAILURE,
  },
  reducer : vueRepo,
} = makeRepoReducer({
  name : 'Vue',
  path : 'vuejs/vue'
})

export {
  fetchVueDetails,
  FETCH_VUE_DETAILS,
  FETCH_VUE_DETAILS_SUCCESS,
  FETCH_VUE_DETAILS_FAILURE
}

export default vueRepo

