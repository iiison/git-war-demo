import { get } from '$UTILS/requestHandler'
import { makeActions, makeReducer } from '$RUTILS/reduxUtils'

/* eslint-disable camelcase */
function getUserRelatedData(list){
  return list.map(({ login, avatar_url }) => ({
    name  : login,
    image : avatar_url
  }))
}
/* eslint-enable */

const GET_REPO_STARERS = 'GET_REPO_STARERS'

const {
  defaultAction : getRepoStarers,
  successAction : getRepoStarersSuccess,
  failureAction : getRepoStarersFailure
} = makeActions(GET_REPO_STARERS)

function updateRepoDetails(response) {
  return {
    type : 'UPDATE_REPO_DETAILS',
    response
  }
}

export {
  getRepoStarers,
  getRepoStarersSuccess,
  getRepoStarersFailure,
  updateRepoDetails
}

export function fetchRepoStarers({ path, type = 'initial' }) {
  return async (dispatch) => {
    if (type === 'initial') {
      dispatch(getRepoStarers())
    }

    try {
      const response = await get({
        path,
        getResponseHeaders : ['link']
      })
      const link = response.responseHeaders.link
      const nextPathFregment = link.split(', ')
        .reduce((prev, curr) => { 
          return curr.includes('next') ? curr : prev
        }, '')
      const formattedUsersList = getUserRelatedData(response.response)

      response.response = formattedUsersList
      response.responseHeaders.link = nextPathFregment
        .slice(0, nextPathFregment.indexOf('>'))
        .replace('<https://api.github.com/', '')

      if (type === 'initial') {
        dispatch(getRepoStarersSuccess(response))
      } else {
        dispatch(updateRepoDetails(response))
      }
    } catch (error){
      dispatch(getRepoStarersFailure(error.message || error))
    }
  }
}

const repoDetails = makeReducer({
  actionName : GET_REPO_STARERS,
  additionalActions (state, action) {
    return {
      UPDATE_REPO_DETAILS : () => ({
        ...state,
        response : {
          response        : [...state.response.response, ...action.response.response],
          responseHeaders : action.response.responseHeaders
        }
      })
    }
  }
})

export default repoDetails

