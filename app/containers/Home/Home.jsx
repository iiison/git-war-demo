import React, { useEffect } from 'react'
import { Link }    from 'react-router-dom'

import { Header, MainContainer } from '$SHAREDCONT'
import * as reactActions from '$RMODULES/home/reactRepo'
import * as angularActions from '$RMODULES/home/angularRepo'
import * as vueActions from '$RMODULES/home/vueRepo'
import { useDispatchableActions, useStoreValues } from '$RUTILS/reduxReactUtils'

export default function Home() {
  const { fetchReactDetails } = reactActions 
  const { fetchAngularDetails } = angularActions 
  const { fetchVueDetails } = vueActions 

  // const { reactRepo = {}, angularRepo = {} } = useStoreValues(['reactRepo', 'angularRepo'])
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

    // fetchAngularDetailsAction()

    // fetchReactDetailsAction({
    //   id   : 'vue',
    //   path : 'vuejs/vue'
    // })
    //
    // fetchReactDetailsAction({
    //   id   : 'angular',
    //   path : 'angular/angular'
    // })
  }, [])

  return (
    <MainContainer>
      <Header>
        <div className='col-12 grid'>
          <span className='col-6'>React War Room</span>
        </div>
      </Header>
    </MainContainer>
  )
}
