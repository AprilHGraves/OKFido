import React from 'react';
import {Route} from 'react-router-dom';
import Signup from './user/signup';
import Login from './user/login';
import Splash from './splash';
import SplashFooter from './splash_footer';
import Onboarding from './user/onboarding';
import AuthRoute from '../util/route_util';

function App() {
  return (
    <div className="App">
      <AuthRoute exact path="/" component={Splash} routeType="auth"/>
      <AuthRoute exact path="/" component={SplashFooter} routeType="auth"/>
      <AuthRoute exact path="/onboarding" component={Onboarding} routeType="protected" />
      <AuthRoute exact path="/signup" component={Signup} routeType="auth"/>
      <AuthRoute exact path="/login" component={Login} routeType="auth"/>
    </div>
  );
}

export default App;
