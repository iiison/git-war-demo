// import React, { useRef, useEffect } from 'react'
import React from 'react'
import { Link }    from 'react-router-dom'

import { Header, MainContainer } from '$SHAREDCONT'
// import * as defectDashboardActionCreators from '$RMODULES/defectDetection/defectDetection'
// import { useDispatchableActions, useStoreValues } from '$RUTILS/reduxReactUtils'

export default function Home() {
  // const { fetchDefectDashboard } = defectDashboardActionCreators 
  // const { defectDashboard = {} } = useStoreValues(['defectDashboard'])
  // const { fetchDefectDashboardAction } = useDispatchableActions([
  //   {
  //     action : fetchDefectDashboard,
  //     name   : 'fetchDefectDashboardAction'
  //   },
  // ])

  // useEffect(() => {
  //   fetchDefectDashboardAction()
  // }, [])

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
