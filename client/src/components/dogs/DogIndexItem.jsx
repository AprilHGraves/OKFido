import React from 'react'
import { Link } from 'react-router-dom';

class DogIndexItem extends React.Component {

  render(){
    let {dog} = this.props;
    return (
      <Link to={`/dogs/${dog.id}`} key={dog.id}>
        <li className="dog-index-item">
          <img src={dog.photoUrl} className="dog-index-item-thumb" alt='profile'/>
          <div className="dog-index-item-info">
            <h3>{dog.name}, {dog.age}</h3>
            <h4>{dog.contact.address.city}</h4>
          </div>
        </li>
      </Link>
    )
  }

}

export default DogIndexItem;