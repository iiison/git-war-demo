import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import Test from '$COMPONENTS/test'
import Test2 from '$COMPONENTS/Test2'

import {
  Home
} from '$CONTAINERS'

const routes = () => (
  <div className='app grid'>
    <div className='col'>
      <Switch>
        <Route exact={true} path='/' component={Home} />
        <Route exact={true} path='/repos/:repoName' component={Test2} />
      </Switch>
    </div>
  </div>
)

export default routes

