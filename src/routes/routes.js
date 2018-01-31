import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Index from '../containers/layout/layout'
export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/index" push />} />
      <Route path="/app" component={Index} />
    </Switch>
  </Router>
)