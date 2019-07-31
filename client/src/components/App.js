import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Signup from './user/signup';
import Login from './user/login';
import Splash from './splash';
import SplashFooter from './splash_footer';
import Onboarding from './user/onboarding';
import AuthRoute from '../util/route_util';
import Home from './home/home'
import DogShow from './dogs/DogShow';

function App() {
  return (
    <div className="App">
      <AuthRoute exact path="/" component={Splash} routeType="auth"/>
      <AuthRoute exact path="/" component={SplashFooter} routeType="auth"/>
      {/* <Switch> */}
        <AuthRoute exact path="/onboarding" component={Onboarding} routeType="protected" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth"/>
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        <AuthRoute exact path="/home" component={Home} routeType="protected" />
        <AuthRoute exact path="/dogs/:id" component={DogShow} routeType="protected"  />
      {/* </Switch> */}
    </div>
  );
}

export default App;
