import { makeRepoReducer } from './home'

const {
  fetchReactDetails,
  actions : {
    FETCH_REACT_DETAILS,
    FETCH_REACT_DETAILS_SUCCESS,
    FETCH_REACT_DETAILS_FAILURE,
  },
  reducer : reactRepo,
} = makeRepoReducer({
  name : 'React',
  path : 'facebook/react'
})

export {
  fetchReactDetails,
  FETCH_REACT_DETAILS,
  FETCH_REACT_DETAILS_SUCCESS,
  FETCH_REACT_DETAILS_FAILURE
}

export default reactRepo
