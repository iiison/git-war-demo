import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import errorTypeDetailMap from '$CONFIGS/errorTypeDetailMap'

import vueRepo, * as vueActions from './vueRepo'
import reactRepo, * as reactActions from './reactRepo'
import angularRepo, * as angularActions from './angularRepo'

import dummRepoData from './dummyRepoResponse.json'

describe('>>> ACTIONS -- Actions Creators', () => {
  describe('• reactRepo Sync Action Creators', () => {
    const {
      getReact,
      getReactSuccess,
      getReactFailure
    } = reactActions


    it('Tests GET_REACT Action Type', () => {
      const result = getReact()
      const expected = { type : 'GET_REACT_DETAILS' }

      expect(result).toStrictEqual(expected)
    })

    it('Tests GET_REACT_SUCCESS Action Type', () => {
      const result = getReactSuccess({
        data : 123
      })
      const expected = {
        type     : 'GET_REACT_DETAILS_SUCCESS',
        response : { data : 123 }
      }

      expect(result).toStrictEqual(expected)
    })


    it('Tests GET_REACT_FAILURE Action Type', () => {
      const result = getReactFailure('Dummy Error')
      const expected = { 
        error : 'Dummy Error',
        type  : 'GET_REACT_DETAILS_FAILURE'
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('• angularRepo Sync Action Creators', () => {
    const {
      getAngular,
      getAngularSuccess,
      getAngularFailure
    } = angularActions


    it('Tests GET_ANGULAR Action Type', () => {
      const result = getAngular()
      const expected = { type : 'GET_ANGULAR_DETAILS' }

      expect(result).toStrictEqual(expected)
    })

    it('Tests GET_ANGULAR_SUCCESS Action Type', () => {
      const result = getAngularSuccess({
        data : 123
      })
      const expected = {
        type     : 'GET_ANGULAR_DETAILS_SUCCESS',
        response : { data : 123 }
      }

      expect(result).toStrictEqual(expected)
    })


    it('Tests GET_ANGULAR_FAILURE Action Type', () => {
      const result = getAngularFailure('Dummy Error')
      const expected = { 
        error : 'Dummy Error',
        type  : 'GET_ANGULAR_DETAILS_FAILURE'
      }

      expect(result).toStrictEqual(expected)
    })
  })


  describe('• vueRepo Sync Action Creators', () => {
    const {
      getVue,
      getVueSuccess,
      getVueFailure
    } = vueActions


    it('Tests GET_VUE Action Type', () => {
      const result = getVue()
      const expected = { type : 'GET_VUE_DETAILS' }

      expect(result).toStrictEqual(expected)
    })

    it('Tests GET_VUE_SUCCESS Action Type', () => {
      const result = getVueSuccess({
        data : 123
      })
      const expected = {
        type     : 'GET_VUE_DETAILS_SUCCESS',
        response : { data : 123 }
      }

      expect(result).toStrictEqual(expected)
    })


    it('Tests GET_VUE_FAILURE Action Type', () => {
      const result = getVueFailure('Dummy Error')
      const expected = { 
        error : 'Dummy Error',
        type  : 'GET_VUE_DETAILS_FAILURE'
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('• reactRepo Async Action Creators', () => {
    const middlewares = [thunk]
    const mockState = {
      reactRepo : {
        isFetching : true,
        error      : ''
      }
    }
    const mockStore = configureMockStore(middlewares)

    it('Tests fetchReactDetails -- Success Case', () => {
      const {
        getReact,
        getReactSuccess,
        fetchReactDetails
      } = reactActions
      const expectedActions = [
        getReact(),
        getReactSuccess({
          openIssues  : 788,
          forks       : 25550,
          stars       : 136079,
          name        : 'react',
          description : 'repo desc',
          starURL     : 'repos/facebook/react/stargazers',
          prCounts    : 'https://api.github.com/repos/facebook/react/pulls'
        })
      ]
      const store = mockStore(mockState)

      fetch.mockResponse(JSON.stringify({
        ...dummRepoData,
        description : 'repo desc'
      }), {
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      return store
        .dispatch(fetchReactDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })

    it('Tests fetchReactDetails -- Failure Case', () => {
      const {
        getReact,
        getReactFailure,
        fetchReactDetails
      } = reactActions
      const expectedActions = [
        getReact(),
        getReactFailure(errorTypeDetailMap.generic)
      ]
      const store = mockStore(mockState)

      fetch.mockReject()

      return store
        .dispatch(fetchReactDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })
  })

  describe('• angularRepo Async Action Creators', () => {
    const middlewares = [thunk]
    const mockState = {
      angularRepo : {
        isFetching : true,
        error      : ''
      }
    }
    const mockStore = configureMockStore(middlewares)

    it('Tests fetchAngularDetails -- Success Case', () => {
      const {
        getAngular,
        getAngularSuccess,
        fetchAngularDetails
      } = angularActions
      const expectedActions = [
        getAngular(),
        getAngularSuccess({
          openIssues  : 788,
          forks       : 25550,
          stars       : 136079,
          name        : 'angular',
          description : 'repo desc',
          starURL     : 'repos/facebook/react/stargazers',
          prCounts    : 'https://api.github.com/repos/facebook/react/pulls'
        })
      ]
      const store = mockStore(mockState)

      fetch.mockResponse(JSON.stringify({
        ...dummRepoData,
        name        : 'angular',
        description : 'repo desc'
      }), {
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      return store
        .dispatch(fetchAngularDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })

    it('Tests fetchAngularDetails -- Failure Case', () => {
      const {
        getAngular,
        getAngularFailure,
        fetchAngularDetails
      } = angularActions
      const expectedActions = [
        getAngular(),
        getAngularFailure(errorTypeDetailMap.generic)
      ]
      const store = mockStore(mockState)

      fetch.mockReject()

      return store
        .dispatch(fetchAngularDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })
  })

  describe('• vueRepo Async Action Creators', () => {
    const middlewares = [thunk]
    const mockState = {
      vueRepo : {
        isFetching : true,
        error      : ''
      }
    }
    const mockStore = configureMockStore(middlewares)

    it('Tests fetchVueDetails -- Success Case', () => {
      const {
        getVue,
        getVueSuccess,
        fetchVueDetails
      } = vueActions
      const expectedActions = [
        getVue(),
        getVueSuccess({
          openIssues  : 788,
          forks       : 25550,
          stars       : 136079,
          name        : 'vue',
          description : 'repo desc',
          starURL     : 'repos/facebook/react/stargazers',
          prCounts    : 'https://api.github.com/repos/facebook/react/pulls'
        })
      ]
      const store = mockStore(mockState)

      fetch.mockResponse(JSON.stringify({
        ...dummRepoData,
        name        : 'vue',
        description : 'repo desc'
      }), {
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      return store
        .dispatch(fetchVueDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })

    it('Tests fetchVueDetails -- Failure Case', () => {
      const {
        getVue,
        getVueFailure,
        fetchVueDetails
      } = vueActions
      const expectedActions = [
        getVue(),
        getVueFailure(errorTypeDetailMap.generic)
      ]
      const store = mockStore(mockState)

      fetch.mockReject()

      return store
        .dispatch(fetchVueDetails())
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })
  })
})

describe('>>> REDUCER --  Repo Reducers', () => {
  let state

  beforeEach(() => {
    state = {
      ...{},
      ...{
        isFetching : true,
        error      : ''
      }
    }
  })

  describe('• reactRepo Reducer Test', () => {
    const {
      getReact,
      getReactSuccess,
      getReactFailure
    } = reactActions

    it('Tests Reducer Initial State', () => {
      const expectedState = state
      const result = reactRepo(undefined, {})

      expect(result).toEqual(expectedState)
    })

    it('Initiates Network Call', () => {
      const result = reactRepo(undefined, getReact())
      const expectedState  = {
        ...state,
        isFetching : true
      }

      expect(result).toEqual(expectedState)
    })

    it('Gets Repo Meta Data successfully', () => {
      const result = reactRepo(undefined, getReactSuccess({
        data : 'abc'
      }))
      const expectedState  = {
        ...state,
        isFetching : false,
        response   : {
          data : 'abc'
        }
      }

      expect(result).toEqual(expectedState)
    })

    it('Fails to get Repo Data', () => {
      const result = reactRepo(undefined, getReactFailure(errorTypeDetailMap.generic))
      const expectedState  = {
        ...state,
        isFetching : false,
        error      : errorTypeDetailMap.generic
      }

      expect(result).toEqual(expectedState)
    })
  })

  describe('• angularRepo Reducer Test', () => {
    const {
      getAngular,
      getAngularSuccess,
      getAngularFailure
    } = angularActions

    it('Tests Reducer Initial State', () => {
      const expectedState = state
      const result = angularRepo(undefined, {})

      expect(result).toEqual(expectedState)
    })

    it('Initiates Network Call', () => {
      const result = angularRepo(undefined, getAngular())
      const expectedState  = {
        ...state,
        isFetching : true
      }

      expect(result).toEqual(expectedState)
    })

    it('Gets Repo Meta Data successfully', () => {
      const result = angularRepo(undefined, getAngularSuccess({
        data : 'abc'
      }))
      const expectedState  = {
        ...state,
        isFetching : false,
        response   : {
          data : 'abc'
        }
      }

      expect(result).toEqual(expectedState)
    })

    it('Fails to get Repo Data', () => {
      const result = angularRepo(undefined, getAngularFailure(errorTypeDetailMap.generic))
      const expectedState  = {
        ...state,
        isFetching : false,
        error      : errorTypeDetailMap.generic
      }

      expect(result).toEqual(expectedState)
    })
  })

  describe('• vueRepo Reducer Test', () => {
    const {
      getVue,
      getVueSuccess,
      getVueFailure
    } = vueActions

    it('Tests Reducer Initial State', () => {
      const expectedState = state
      const result = vueRepo(undefined, {})

      expect(result).toEqual(expectedState)
    })

    it('Initiates Network Call', () => {
      const result = vueRepo(undefined, getVue())
      const expectedState  = {
        ...state,
        isFetching : true
      }

      expect(result).toEqual(expectedState)
    })

    it('Gets Repo Meta Data successfully', () => {
      const result = vueRepo(undefined, getVueSuccess({
        data : 'abc'
      }))
      const expectedState  = {
        ...state,
        isFetching : false,
        response   : {
          data : 'abc'
        }
      }

      expect(result).toEqual(expectedState)
    })

    it('Fails to get Repo Data', () => {
      const result = vueRepo(undefined, getVueFailure(errorTypeDetailMap.generic))
      const expectedState  = {
        ...state,
        isFetching : false,
        error      : errorTypeDetailMap.generic
      }

      expect(result).toEqual(expectedState)
    })
  })
})

