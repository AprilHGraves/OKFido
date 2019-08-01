import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import Queries from '../../graphql/queries';
const { GET_USER_PREFS, GET_USER_ID } = Queries;

const MatchPercent = (props) => {
    return (
      <ApolloConsumer>
        {client => {
          let {_id} = client.readQuery({ query: GET_USER_ID })
          return (
            <Query query={GET_USER_PREFS} variables={{ id: _id }}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return data.user.email;
              }}
            </Query>
          )
        }}
        </ApolloConsumer>
    )

}

export default MatchPercent;