import gql from "graphql-tag";

export default {
  
  GET_USER_ID: gql`
    query IsUserLoggedIn {
      _id @client,
    }
  `,
}