import React from 'react';
import {Route} from 'react-router-dom';
import Nav from './Nav'
import Signup from './user/signup';
import Login from './user/login';

function App() {
  return (
    <div className="App">
      Hello Waldo
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Nav}/>
    </div>
  );
}

export default App;
