import Queries from '../../graphql/queries';
import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import DogIndexItem from './DogIndexItem';
const { FETCH_SHIBAS, GET_USER_ID, GET_USER_PREFS } = Queries;

const DogIndex = () => {
  return (
    <ApolloConsumer>
      {client => {
        let { _id } = client.readQuery({ query: GET_USER_ID })
        let userPrefs = client.readQuery({ query: GET_USER_PREFS, variables: {id: _id} })
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
                        userPrefs={userPrefs}
                      />
                  ))}
                </ul>
              );
            }}
          </Query>)
      }}
    </ApolloConsumer>
  );
}

export default DogIndex;