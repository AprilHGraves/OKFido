import React from 'react'
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render(){
    return (
      <div className="navigation">
        <div className="nav-left">
          <Link to="/">
            <i className="fas fa-dog"></i>
          </Link>
          <Link to='/browse'>Browse Matches</Link>
        </div>
        <div className="nav-right">
          <Link to='/messages'>
            <i className="fas fa-comment"></i>
          </Link>
          <Link>Logout</Link>
        </div>
      </div>
    )
  }
}

export default Nav;