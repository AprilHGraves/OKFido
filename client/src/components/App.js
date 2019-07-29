import React from 'react';
import {Route} from 'react-router-dom';
import Nav from './Nav'
import Splash from './splash'
function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route path="/" component={Splash}/>
    </div>
  );
}

export default App;
