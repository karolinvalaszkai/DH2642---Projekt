import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/quiz" component={Quiz} />
    </Switch>
  </main>
);

export default Main;
