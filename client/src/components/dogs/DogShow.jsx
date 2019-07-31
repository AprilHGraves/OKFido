import React from 'react'
import Nav from '../home/nav';
import Queries from '../../graphql/queries';
import { Query } from "react-apollo";
import DogShowHeader from './DogShowHeader';
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
          if (!dog) { return <div></div>}
          return (
            <div className="dog-show-container">
              <Nav />
              <div className=""></div>
              <div className="dog-show-info">
                <DogShowHeader dog={dog}/>
                <div className="dog-show-info-content">
                  <div className="dog-show-info-content-main">
                    <div className="dog-show-desc">
                      <div className="dog-show-desc-header">Description</div>
                      <div className="dog-show-desc-contents">{dog.description}</div>
                      
                    </div>
                  </div>
                  <div className="dog-show-info-content-sidebar">
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