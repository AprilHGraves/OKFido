import React from 'react'
import DogIndex from '../dogs/DogIndex'

class Home extends React.Component {
  render(){
    return (
      <div className="home-container">
        <DogIndex />
      </div>
    )
  }
}

export default Home;