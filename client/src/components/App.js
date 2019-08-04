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
import Nav from './home/nav';
import SearchFilters from './search/search_filters'
import LikedDogs from './dogs/LikedDogs';

function App() {
  return (
    <div className="App">
      <Switch>
        <AuthRoute exact path="/onboarding" component={Onboarding} routeType="protected" />
        <AuthRoute path="/" component={Nav} routeType="protected" />
      </Switch>
      <Switch>
        <AuthRoute exact path="/search" component={SearchFilters} routeType="protected"/>
        <AuthRoute exact path="/" component={Splash} routeType="auth"/>
        <AuthRoute exact path="/signup" component={Signup} routeType="auth"/>
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        <AuthRoute exact path="/home" component={Home} routeType="protected" />
        <AuthRoute exact path="/likes" component={LikedDogs} routeType="protected" />
        <AuthRoute exact path="/dogs/:id" component={DogShow} routeType="protected"  />
      </Switch>
      <AuthRoute exact path="/" component={SplashFooter} routeType="auth" />
    </div>
  );
}

export default App;
