import Queries from '../../graphql/queries';
import React from 'react';
import { Query, withApollo } from "react-apollo";
import DogIndexItem from './DogIndexItem';
const { FETCH_DOGS_BASED_DIST_LOC } = Queries;

const DogIndex = () => {
  return (
    <Query query={FETCH_DOGS_BASED_DIST_LOC} variables={{}}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul className="dog-items-list">
            {data.dogs.map(dog => (
                <DogIndexItem
                  key={dog.id}
                  dog={dog}
                />
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default withApollo(DogIndex);