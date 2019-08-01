import gql from "graphql-tag";

export default {
  LIKE_DOG: gql`
    mutation LikeDog($userId: ID!, $dogId: ID!) {
      likeDog(userId: $userId, dogId: $dogId) {
        _id
      }
    }
  `,
  UNLIKE_DOG: gql`
    mutation UnlikeDog($dogId: ID!, $userId: ID!) {
      unlikeDog(dogId: $dogId, userId: $userId) {
        _id
      }
    }
  `,
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
        loggedIn
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
        zipcode
        willTravel
        hasChildren
        hasDogs
        hasCats
        likedSizes
        likedGenders
        likedAges
      }
    }

  `
}