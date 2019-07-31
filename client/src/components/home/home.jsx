import React from 'react'
import DogIndex from '../dogs/DogIndex'
import Nav from './nav';

class Home extends React.Component {
  render(){
    return (
      <div className="home-container">
        <Nav />
        <DogIndex />
      </div>
    )
  }
}

export default Home;