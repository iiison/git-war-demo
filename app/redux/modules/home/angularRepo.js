import { makeRepoReducer } from './home'

const {
  fetchAngularDetails,
  actions : {
    getAngular,
    getAngularSuccess,
    getAngularFailure,
  },
  reducer : angularRepo,
} = makeRepoReducer({
  name : 'Angular',
  path : 'angular/angular'
})

export {
  getAngular,
  getAngularSuccess,
  getAngularFailure,
  fetchAngularDetails
}

export default angularRepo
