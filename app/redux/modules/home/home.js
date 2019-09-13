import { get } from '$UTILS/requestHandler'
import { makeActions, makeReducer } from '$RUTILS/reduxUtils'

/* eslint-disable camelcase */
function getRepoData({
  stargazers_count,
  open_issues_count,
  forks_count,
  pulls_url,
  organization : { avatar_url }
}){
  return {
    stars      : stargazers_count,
    openIssues : open_issues_count,
    forks      : forks_count,
    prCounts   : pulls_url.slice(0, pulls_url.indexOf('{')),
    avatar     : avatar_url
  }
}
/* eslint-enable */

export function makeRepoReducer({ name, path }) {
  const actionName = [`GET_${name.toUpperCase()}_DETAILS`]
  const {
    defaultAction,
    successAction,
    failureAction
  } = makeActions(actionName[0])

  function asyncAction() {
    return async (dispatch) => {
      dispatch(defaultAction())

      try {
        const response = await get({ 
          path : `repos/${path}`
        })
        const repoData = getRepoData(response)

        dispatch(successAction(repoData))
      } catch (error){
        dispatch(failureAction(error.message || error))
      }
    }
  }

  const reducer = makeReducer({
    actionName : actionName[0],
    additionalActions (state, action) {
      return {
        UPDATE_REPO_DETAILS : () => ({
          ...state,
          [action.id] : action.repoData || null
        })
      }
    }
  })

  return {
    reducer,
    [`fetch${name}Details`] : asyncAction,
    actions                 : {
      [actionName[0]]              : defaultAction,
      [`${actionName[0]}_SUCCESS`] : successAction,
      [`${actionName[0]}_FAILURE`] : failureAction
    }
  }
}

