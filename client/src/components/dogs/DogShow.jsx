import React from 'react'
import Nav from '../home/nav';
import Queries from '../../graphql/queries';
import { Query } from "react-apollo";
import DogShowHeader from './DogShowHeader';
const { FETCH_ONE_DOG } = Queries;

class DogShow extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      descExpanded: false
    }
  }

  expandDescription(){
    this.setState({descExpanded: true})
  }

  render() {
    let dogId = this.props.match.params.id;

    let dogDescClass = 
      this.state.descExpanded ? 
      "dog-show-desc-contents" :
        "dog-show-desc-contents dog-show-desc-contents--collapsed";

    let expandButtonClass = 
      this.state.descExpanded ?
      "dog-show-desc-expander--hidden" :
      "dog-show-desc-expander";
    
    return (
      <Query query={FETCH_ONE_DOG} variables={{ dogId: dogId }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          if (!data.dog){
            return <></>
          }
          let dog = data.dog;

          if (dog.description === "No description provided."){
            dogDescClass = "dog-show-desc-contents"
            expandButtonClass = "dog-show-desc-expander--hidden"
          }

          let envChild = "";
          if (dog.environment.children) {
            envChild = "Good with children"
          } else {
            envChild = "Not good with children"
          }

          let envDogs = "";
          if (dog.environment.children) {
            envDogs = "Good with other dogs"
          } else {
            envDogs = "Not good with other dogs"
          }

          let envCats = "";
          if (dog.environment.children) {
            envCats = "Good with cats"
          } else {
            envCats = "Not good with cats"
          }

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
                      <div className={dogDescClass}>
                        {dog.description}
                      </div>
                      <button 
                        className={expandButtonClass}
                        onClick={this.expandDescription.bind(this)}  
                      >
                        <div className="dog-show-desc-expander-bg"></div>
                        <span className="dog-show-desc-expander-text">
                          + More
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="dog-show-info-content-sidebar">
                    <div className="dog-show-info-content-sidebar-details">
                      <span className="dog-show-info-content-sidebar-details-header">
                        {dog.breeds.primary}
                      </span>
                      <div className="dog-show-info-content-sidebar-details-row">
                        <span role="img" aria-label="target">🎯</span>
                        <span>{dog.gender}, {dog.size}, {dog.coat} coat</span>
                      </div>
                      <div className="dog-show-info-content-sidebar-details-row">
                        <span role="img" aria-label="child">🧒</span>
                        <span>{envChild}</span>
                      </div>
                      <div className="dog-show-info-content-sidebar-details-row">
                        <span role="img" aria-label="dog">🐕</span>
                        <span>{envDogs}</span>
                      </div>
                      <div className="dog-show-info-content-sidebar-details-row">
                        <span role="img" aria-label="cat">🐈</span>
                        <span>{envCats}</span>
                      </div>
                    </div>
                    <div className="dog-show-info-content-sidebar-details">
                      <span className="dog-show-info-content-sidebar-details-header">
                        contact
                      </span>
                      <div className="dog-show-info-content-sidebar-details-row">
                        <div>
                          {dog.contact.address.address1} 
                        </div>
                        <div>
                          {dog.contact.address.address2}
                        </div>
                        <div>
                          {dog.contact.address.city}, {dog.contact.address.state}
                        </div>
                        <div>
                          {dog.contact.address.postcode} {dog.contact.address.country}
                        </div>
                      </div>
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
