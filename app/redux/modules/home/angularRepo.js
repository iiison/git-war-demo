import { makeRepoReducer } from './home'

const {
  fetchAngularDetails,
  actions : {
    FETCH_ANGULAR_DETAILS,
    FETCH_ANGULAR_DETAILS_SUCCESS,
    FETCH_ANGULAR_DETAILS_FAILURE,
  },
  reducer : angularRepo,
} = makeRepoReducer({
  name : 'Angular',
  path : 'angular/angular'
})

export {
  fetchAngularDetails,
  FETCH_ANGULAR_DETAILS,
  FETCH_ANGULAR_DETAILS_SUCCESS,
  FETCH_ANGULAR_DETAILS_FAILURE
}

export default angularRepo

