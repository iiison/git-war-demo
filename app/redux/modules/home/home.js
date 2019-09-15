import { get } from '$UTILS/requestHandler'
import { makeActions, makeReducer } from '$RUTILS/reduxUtils'

/* eslint-disable camelcase */
export function getRepoData({
  name,
  pulls_url,
  description,
  forks_count,
  stargazers_url,
  stargazers_count,
  open_issues_count
}){
  return {
    name,
    description,
    stars      : stargazers_count,
    openIssues : open_issues_count,
    forks      : forks_count,
    prCounts   : pulls_url.slice(0, pulls_url.indexOf('{')),
    starURL    : stargazers_url.replace('https://api.github.com/', '')
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

  const reducer = makeReducer({ actionName : actionName[0] })

  return {
    reducer,
    [`fetch${name}Details`] : asyncAction,
    actions                 : {
      [`get${name}`]        : defaultAction,
      [`get${name}Success`] : successAction,
      [`get${name}Failure`] : failureAction
    }
  }
}

