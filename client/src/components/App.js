import React from 'react';
import {Route} from 'react-router-dom';
import Nav from './Nav'
function App() {
  return (
    <div className="App">
      Hello Waldo

      <Route path="/" component={Nav}/>
    </div>
  );
}

export default App;
