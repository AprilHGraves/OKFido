import React from 'react'

class DogShowHeader extends React.Component {
  render(){
    let dog = this.props.dog;
    return (
      <div className="dog-show-info-inner">
        <div className="dog-show-info-inner-content">
          <div className="profile-thumb">
            <img src={dog.photoUrl} alt="profile"></img>
          </div>
          <div className="profile-basics">
            <h1>{dog.name}</h1>
            <div className="profile-basics-asl">
              <span className="profile-basics-asl-age">{dog.age}</span>
              <span className="profile-basics-asl-spacer">•</span>
              <span className="profile-basics-asl-location">{dog.contact.address.city}, {dog.contact.address.state}</span>
              <span className="profile-basics-asl-spacer">•</span>
              <span className="profile-basics-asl-match">50% Match</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DogShowHeader;