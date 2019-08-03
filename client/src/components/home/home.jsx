import React from 'react'
import DogIndex from '../dogs/DogIndex'
import {withApollo} from 'react-apollo'
import {withRouter} from 'react-router'
import Queries from '../../graphql/queries';

const { GET_USER, GET_USER_PREFS } = Queries;
class Home extends React.Component {
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

  getUser = async () => {
    let token = localStorage.getItem("auth-token")

    let userIdQueryResult = await this.props.client.query({
      query: GET_USER,
      variables: { token: token }
    })

    let userPrefsResult = await this.props.client.query({
      query: GET_USER_PREFS,
      variables: { id: userIdQueryResult.data.userByToken._id }
    })
    console.log(userPrefsResult.data.user)
    if (!userPrefsResult.data.user.zipcode) {
      this.props.history.push('/onboarding')
    } else {
      this.setState({ currentUserPrefs: userPrefsResult.data.user, loading: false })
    }
  }

  render(){
    if (this.state.loading) {
      return <></>
    }
    return (
      <div className="home-container">
        <DogIndex />
      </div>
    )
  }
}

export default withApollo(withRouter(Home));