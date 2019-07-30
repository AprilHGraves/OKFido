import Queries from '../../graphql/queries';
import React from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
const { FETCH_SHIBAS } = Queries;

const DogIndex = () => {
  return (
    <Query query={FETCH_SHIBAS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.dogs.map(dog => (
              <li>{dog.name}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}

export default DogIndex;