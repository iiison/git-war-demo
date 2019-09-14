import React, { useEffect } from 'react'

import { Header, MainContainer, RepoTile } from '$SHAREDCONT'
import * as reactActions from '$RMODULES/home/reactRepo'
import * as angularActions from '$RMODULES/home/angularRepo'
import * as vueActions from '$RMODULES/home/vueRepo'
import * as repoDetailsActions from '$RMODULES/repoDetails/repoDetails'
import { useDispatchableActions, useStoreValues } from '$RUTILS/reduxReactUtils'
import { debounce } from '$UTILS'

import { RenderUI } from '../renderData'

let scrollEvent

export default function RepoDetails({ match : { params : { repoName } } }) {
  const { fetchVueDetails } = vueActions 
  const { fetchReactDetails } = reactActions 
  const { fetchAngularDetails } = angularActions 
  const { fetchRepoStarers } = repoDetailsActions 

  const { 
    vueRepo = {},
    reactRepo = {},
    angularRepo = {},
    repoDetails = {},
  } = useStoreValues(['reactRepo', 'angularRepo', 'vueRepo', 'repoDetails'])
  const {
    fetchVueDetailsAction,
    fetchRepoStarersAction,
    fetchReactDetailsAction,
    fetchAngularDetailsAction
  } = useDispatchableActions([
    {
      action : fetchReactDetails,
      name   : 'fetchReactDetailsAction'
    },
    {
      action : fetchAngularDetails,
      name   : 'fetchAngularDetailsAction'
    },
    {
      action : fetchVueDetails,
      name   : 'fetchVueDetailsAction'
    },
    {
      action : fetchRepoStarers,
      name   : 'fetchRepoStarersAction'
    },
  ])

  const repoAPIMap = {
    react : {
      action : fetchReactDetailsAction,
      data   : reactRepo
    },
    angular : {
      action : fetchAngularDetailsAction,
      data   : angularRepo
    },
    vue : {
      action : fetchVueDetailsAction,
      data   : vueRepo
    }
  }

  useEffect(() => {
    const { action, data : { response : data } } = repoAPIMap[repoName]

    if (!data) {
      action()
    }
  }, [])

  useEffect(() => {
    const { response : repoMeta } = repoAPIMap[repoName].data

    if (!repoDetails.repsonse && repoMeta) {
      fetchRepoStarersAction({ path : repoMeta.starURL })
    }
  }, [repoAPIMap[repoName].data])

  useEffect(() => {
    if (repoDetails && repoDetails.response && !scrollEvent) {
      scrollEvent = debounce(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
        ) {
          repoDetails.response && fetchRepoStarersAction({
            path : repoDetails.response.responseHeaders.link,
            type : 'append'
          })
        }
      }, 300)

      window.addEventListener('scroll', scrollEvent)
    }

    return () => {
      window.removeEventListener('scroll', scrollEvent)
      scrollEvent = null
    }
  }, [repoDetails.response])


  return (
    <MainContainer>
      <Header>
        <div className='col-12 grid'>
          <span className='col-6'>React War Room</span>
        </div>
      </Header>
      <RepoTile data={repoAPIMap[repoName].data} />
      <div className='col-12 padded-l'>
        <div className='grid'>
          <RenderUI keyData={repoDetails}>
            {
              repoDetails.response && repoDetails.response.response.map(({login}) => (
                <div key={login} className='col-12 padded-xxl'>
                  {`User : ${login}`}
                </div>
              ))
            }
            
          </RenderUI>
        </div>
      </div>
    </MainContainer>
  )
}

/* 
<InfiniteScroll
  dataLength={repoDetails.response.response.length}
  next={() => fetchRepoStarersAction({
    path : repoDetails.response.responseHeaders.link,
    type : 'append'
  })}
  hasMore={true}
  loader={<h4>Loading...</h4>}
>
  {repoDetails.response.response.map(({login}) => (
    <div key={login} className='col-12 padded-xxl'>
      {`User : ${login}`}
    </div>
  ))}
</InfiniteScroll>
*/
