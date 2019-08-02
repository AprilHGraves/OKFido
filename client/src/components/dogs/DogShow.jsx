import React from 'react'
import Nav from '../home/nav';
import Queries from '../../graphql/queries';
import { Query, withApollo } from "react-apollo";
import DogShowHeader from './DogShowHeader';
const { FETCH_ONE_DOG, GET_USER_ID, GET_USER_PREFS } = Queries;

class DogShow extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      descExpanded: false,
      loading: true,
      currentUserPrefs: {}
    }
  }

  expandDescription(){
    this.setState({descExpanded: true})
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    let token = localStorage.getItem("auth-token")

    let userIdQueryResult = await this.props.client.query({
      query: GET_USER_ID,
      variables: { token: token }
    })

    let userPrefsResult = await this.props.client.query({
      query: GET_USER_PREFS,
      variables: { id: userIdQueryResult.data.userByToken._id }
    })

    this.setState({ currentUserPrefs: userPrefsResult.data.user, loading: false })
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

    if (this.state.loading){
      return <></>
    }
    
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
          } else if (dog.environment.children == null){
            envChild = "Unknown if good with children"
          } else {
            envChild = "Not good with children";
          }

          let envDogs = "";
          if (dog.environment.dogs) {
            envDogs = "Good with other dogs"
          } else if (dog.environment.dogs == null) {
            envDogs = "Unknown if good with other dogs"
          } else {
            envDogs = "Not good with other dogs"
          }

          let envCats = "";
          if (dog.environment.cats) {
            envCats = "Good with cats"
          } else if (dog.environment.cats == null) {
            envCats = "Unknown if good with cats"
          } else {
            envCats = "Not good with cats"
          }

          return (
            <div className="dog-show-container">
              <div className=""></div>
              <div className="dog-show-info">
                <DogShowHeader dog={dog} userPrefs={this.state.currentUserPrefs}/>
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
                        {dog.coat ? (<span>{dog.gender}, {dog.size}, {dog.coat} coat</span>) 
                          : (<span>{dog.gender}, {dog.size}</span>)}
                        
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
                          {dog.contact.email}
                        </div>
                        <div>
                          {dog.contact.phone}
                        </div>
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
                        <a href={dog.url}>Check me out on PetFinder</a>
                      </div>
                    </div>
                  </div>
                  <div className="dog-show-info-content-main">
                    <div className="dog-show-desc">
                      <div className="dog-show-desc-header">Breed Information</div>
                      <div className="dog-show-desc-contents">
                        {!dog.breedInfo ? "No breed information" : ""}
                        {dog.breedInfo && dog.breedInfo.bred_for ? (
                          <div>
                            <h3>Bred for</h3>
                            {dog.breedInfo.bred_for}
                          </div>) : 
                          (<div></div>) 
                        }

                        {dog.breedInfo && dog.breedInfo.temperament ? (
                          <div>
                            <h3>Temperamnt</h3>
                            {dog.breedInfo.temperament}
                          </div>) :
                          (<div></div>)
                        }

                        {dog.breedInfo && dog.breedInfo.life_span ? (
                          <div>
                            <h3>Life Span</h3>
                            {dog.breedInfo.life_span}
                          </div>) :
                          (<div></div>)
                        }
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

export default withApollo(DogShow);
