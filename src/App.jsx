import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './home-page/homePage';
import BattlePage from './battle-page/battlePage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' exact component={HomePage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/battle/:name' component={BattlePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
