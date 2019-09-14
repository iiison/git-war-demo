import React, { useEffect } from 'react'

import { Header, MainContainer, RepoTile } from '$SHAREDCONT'
import * as reactActions from '$RMODULES/home/reactRepo'
import * as angularActions from '$RMODULES/home/angularRepo'
import * as vueActions from '$RMODULES/home/vueRepo'
import { useDispatchableActions, useStoreValues } from '$RUTILS/reduxReactUtils'

export default function Home({ history : { push } }) {
  const { fetchReactDetails } = reactActions 
  const { fetchAngularDetails } = angularActions 
  const { fetchVueDetails } = vueActions 

  const commonProps = {
    pushRef : push
  }

  const { 
    vueRepo = {},
    reactRepo = {},
    angularRepo = {}
  } = useStoreValues(['reactRepo', 'angularRepo', 'vueRepo'])
  const {
    fetchReactDetailsAction, fetchAngularDetailsAction, fetchVueDetailsAction
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
  ])

  useEffect(() => {
    fetchReactDetailsAction()
    fetchAngularDetailsAction()
    fetchVueDetailsAction()
  }, [])

  return (
    <MainContainer>
      <Header>
        <div className='col-12 grid'>
          <span className='col-12'>React War Room</span>
        </div>
      </Header>
      <h2>Allies</h2>
      <RepoTile data={reactRepo} {...commonProps} />
      <h2 style={{marginTop : '50px'}}>Enimies</h2>
      <RepoTile data={angularRepo} {...commonProps} />
      <RepoTile data={vueRepo} {...commonProps} />
    </MainContainer>
  )
}
