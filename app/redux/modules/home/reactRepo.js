import { makeRepoReducer } from './home'

const {
  fetchReactDetails,
  actions : {
    getReact,
    getReactSuccess,
    getReactFailure,
  },
  reducer : reactRepo,
} = makeRepoReducer({
  name : 'React',
  path : 'facebook/react'
})

export {
  getReact,
  getReactSuccess,
  getReactFailure,
  fetchReactDetails
}

export default reactRepo

