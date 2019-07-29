import React from 'react';
import {Route} from 'react-router-dom';
import Signup from './user/signup';
import Login from './user/login';
import Splash from './splash'

function App() {
  return (
    <div className="App">
      Hello Waldo
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Splash}/>
    </div>
  );
}

export default App;
