import Queries from '../../graphql/queries';
import React from 'react';
import { Query, withApollo } from "react-apollo";
import DogIndexItem from './DogIndexItem';
const { FETCH_DOGS_BASED_DIST_LOC, GET_USER, GET_USER_PREFS } = Queries;

class DogIndex extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentUserPrefs: {},
      loading: true
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = async() => {
    let token = localStorage.getItem("auth-token")

    let userIdQueryResult = await this.props.client.query({
      query: GET_USER,
      variables: {token: token}
    })

    let userPrefsResult = await this.props.client.query({
      query: GET_USER_PREFS,
      variables: { id: userIdQueryResult.data.userByToken._id }
    })

    this.setState({ currentUserPrefs: userPrefsResult.data.user, loading: false})
  }
  
  render(){
    if (this.state.loading){
      return <></>
    }
    let distance = this.state.currentUserPrefs.willTravel;
    let location = this.state.currentUserPrefs.zipcode.toString();

    return (
      <Query 
        query={FETCH_DOGS_BASED_DIST_LOC} 
        variables={{ distance, location }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <ul className="dog-items-list">
              {data.dogs.map(dog => (
                  <DogIndexItem
                    key={dog.id}
                    dog={dog}
                    userPrefs={this.state.currentUserPrefs}
                  />
              ))}
            </ul>
          );
        }}
      </Query>
    )  
  }
}
export default withApollo(DogIndex);