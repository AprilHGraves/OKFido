import Queries from '../../graphql/queries';
import React from 'react';
import { Query, withApollo } from "react-apollo";
import DogIndexItem from './DogIndexItem';
const { FETCH_SHIBAS, GET_USER_ID, GET_USER_PREFS } = Queries;

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
      query: GET_USER_ID,
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
    return (
      <Query query={FETCH_SHIBAS}>
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