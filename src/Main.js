import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'


const Main = () => (
  <main>
    <Switch>
      <Route path ='/' component={Home}/>
      <Route path ='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main