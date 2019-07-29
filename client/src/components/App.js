import React from 'react';
import {Route} from 'react-router-dom';
import Nav from './Nav'
import Splash from './splash'
import SplashFooter from './splash_footer'
function App() {
  return (
    <div className="App">
      {/* <Route path="/" component={Nav} /> */}
      <Route path="/" component={Splash} />
      <Route path="/" component={SplashFooter}/>
    </div>
  );
}

export default App;
