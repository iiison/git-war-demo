import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import errorTypeDetailMap from '$CONFIGS/errorTypeDetailMap'

import repoDetails, * as actions from './repoDetails'

const dummyData = [
  {
    login : 'abc',
    avatar_url : '/some/address'
  },
  {
    login : 'def',
    avatar_url : '/some/other/address'
  }
]

const { getRepoStarers,
  getRepoStarersSuccess,
  getRepoStarersFailure,
  fetchRepoStarers,
  updateRepoDetails,
} = actions

describe('>>> ACTIONS -- Actions Creators', () => {
  describe('• repoDetails Sync Action Creators', () => {
    it('Tests GET_REPO_STARERS Actions', () => {
      const result = getRepoStarers()
      const expected = { type : 'GET_REPO_STARERS' }

      expect(result).toStrictEqual(expected)
    })

    it('Tests GET_REPO_STARERS_SUCCESS Actions', () => {
      const result = getRepoStarersSuccess({
        data : 'abc'
      })
      const expected = {
        type     : 'GET_REPO_STARERS_SUCCESS',
        response : {
          data : 'abc'
        }
      }

      expect(result).toStrictEqual(expected)
    })

    it('Tests GET_REPO_STARERS_FAILURE Actions', () => {
      const result = getRepoStarersFailure(errorTypeDetailMap.generic)
      const expected = {
        type  : 'GET_REPO_STARERS_FAILURE',
        error : errorTypeDetailMap.generic
      }

      expect(result).toStrictEqual(expected)
    })


    it('Tests GET_REPO_STARERS Actions', () => {
      const result = updateRepoDetails({
        data : 'abc'
      })
      const expected = {
        type     : 'UPDATE_REPO_DETAILS',
        response : {
          data : 'abc'
        }
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('• repoDetails Async Action Creators', () => {
    const middlewares = [thunk]
    const mockState = {
      repoDetails : {
        isFetching : true,
        error      : ''
      }
    }
    const mockStore = configureMockStore(middlewares)

    it('Tests fetchRepoStarers Initial call -- Success Case', () => {
      const expectedActions = [
        getRepoStarers(),
        getRepoStarersSuccess({
          response : [ 
            {
              name  : 'abc',
              image : '/some/address'
            },
            { 
              name  : 'def',
              image : '/some/other/address'
            }
          ],
          responseHeaders : { link : undefined }
        })
      ]
      const store = mockStore(mockState)

      fetch.mockResponse(JSON.stringify(dummyData), {
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      return store
        .dispatch(fetchRepoStarers({ path : 'abc/def' }))
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })


    it('Tests fetchRepoStarers Append call -- Success Case', () => {
      const expectedActions = [
        updateRepoDetails({
          response : [ 
            {
              name  : 'abc',
              image : '/some/address'
            },
            { 
              name  : 'def',
              image : '/some/other/address'
            }
          ],
          responseHeaders : { link : undefined }
        })
      ]
      const store = mockStore(mockState)

      fetch.mockResponse(JSON.stringify(dummyData), {
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      return store
        .dispatch(fetchRepoStarers({
          type : 'append',
          path : 'abc/def'
        }))
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })

    it('Tests fetchRepoStarers -- Failure Case', () => {
      const expectedActions = [
        getRepoStarers(),
        getRepoStarersFailure(errorTypeDetailMap.generic)
      ]
      const store = mockStore(mockState)

      fetch.mockReject()

      return store
        .dispatch(fetchRepoStarers({ path : 'abc/def' }))
        .then(() => {
          expect(store.getActions()).toStrictEqual(expectedActions)
        })
    })
  })

  describe('>>> REDUCER --  repoDetails', () => {
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

    it('Initiates Network Call', () => {
      const result = repoDetails(undefined, getRepoStarers())
      const expectedState  = {
        ...state,
        isFetching : true
      }

      expect(result).toEqual(expectedState)
    })

    it('Gets Repo Meta Data successfully', () => {
      const result = repoDetails(undefined, getRepoStarersSuccess({
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

    it('Fails to get Repo Details', () => {
      const result = repoDetails(
        undefined, 
        getRepoStarersFailure(errorTypeDetailMap.generic)
      )
      const expectedState  = {
        ...state,
        isFetching : false,
        error      : errorTypeDetailMap.generic
      }

      expect(result).toEqual(expectedState)
    })

    it('Updates Starrers of a Repo', () => {
      const dummyState = {
        ...state,
        response : {
          response        : [1, 2, 3, 4],
          responseHeaders : {
            link : 'some/path'
          }
        }
      }
      const result = repoDetails(
        dummyState, 
        updateRepoDetails({
          response        : [5, 6, 7],
          responseHeaders : {
            link : 'other/path'
          }
        })
      )
      const expectedState  = {
        ...state,
        response : {
          response        : [1, 2, 3, 4, 5, 6, 7],
          responseHeaders : {
            link : 'other/path'
          }
        }
      }

      expect(result).toEqual(expectedState)
    })
  })
})
