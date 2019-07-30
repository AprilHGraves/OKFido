import gql from "graphql-tag";

export default {
  
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_SHIBAS: gql`
    query FetchDogs {
      dogs {
        id,
        age,
        gender,
        size,
        name,
        description
      }
    }
  `
}