import React from 'react';
import {Route} from 'react-router-dom';
import Signup from './user/signup';
import Login from './user/login';
import Splash from './splash'

import SplashFooter from './splash_footer'
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Splash} />
      <Route exact path="/" component={SplashFooter}/>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default App;
