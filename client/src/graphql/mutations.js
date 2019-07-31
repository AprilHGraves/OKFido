import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        _id
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  UPDATE_USER: gql`
    mutation UpdateUser(
      $id: ID!,
      $username: String!,
      $hasDogs: Boolean!,
      $hasCats: Boolean!,
      $hasChildren: Boolean!,
      $zipcode: Int!,
      $willTravel: Int!,
      $likedSizes: [String]!,
      $likedGenders: [String]!,
      $likedAges: [String]!
    ) {
      updateUser(
        _id: $id,
        username: $username,
        hasDogs: $hasDogs,
        hasCats: $hasCats,
        hasChildren: $hasChildren,
        zipcode: $zipcode,
        willTravel: $willTravel,
        likedSizes: $likedSizes,
        likedGenders: $likedGenders,
        likedAges: $likedAges
      ) {
        _id
      }
    }

  `
}