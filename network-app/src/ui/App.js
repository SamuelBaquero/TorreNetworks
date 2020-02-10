import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import Network from './components/Network';


/**
 * Render Routes using ract router.
 */
export const App = ()=>(
  <Router>
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path="/network/:username" component={Network}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </Router>
);
