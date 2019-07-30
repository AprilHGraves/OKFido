import React from 'react'
import Nav from '../home/nav';
import Queries from '../../graphql/queries';
import { Query } from "react-apollo";
const { FETCH_ONE_DOG } = Queries;

class DogShow extends React.Component {
  render() {
    let dogId = this.props.match.params.id;
    return (
      <Query query={FETCH_ONE_DOG} variables={{ dogId: dogId }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          let dog = data.dog;

          return (
            <div>
              <Nav />
              <div className="dog-show-info">
                <div className="dog-show-info-inner">
                  <div className="dog-show-info-inner-content">
                    <div className="profile-thumb">
                      <img src={dog.photoUrl} alt="profile"></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    );
    
  }
}

export default DogShow;