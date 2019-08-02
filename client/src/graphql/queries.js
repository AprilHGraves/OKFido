import gql from "graphql-tag";

export default {
  LIKED_DOGS: gql`
    query LikedDogs($userId: ID!) {
      likedDogs(userId: $userId) {
        dogIds
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsLoggedIn {
      isLoggedIn @client
    }
  `,
  GET_USER_ID: gql`
    query GetUserId($token: String!) {
      userByToken(token: $token) {
        _id
      }
    }
  `,
  FETCH_DOGS_BASED_DIST_LOC: gql`
    query FetchDogs {
      dogs {
        id,
        age,
        gender,
        size,
        name,
        description,
        photoUrl,
        contact {
          address {
            city
          }
        }
        environment {
          children,
          dogs,
          cats
        },
      }
    }
  `,
  FETCH_ONE_DOG: gql`
  query FetchDog($dogId: ID!) {
    dog(dogId: $dogId) {
      id,
      age,
      gender,
      size,
      url,
      name,
      description,
      coat,
      photoUrl,
      breeds {
        primary
      }
      contact {
        email
        phone
        address {
          address1
          address2
          city
          state
          postcode
          country
        }
      },
      environment {
        children,
        dogs,
        cats
      },
      breedInfo {
        bred_for
        temperament
        life_span
      }
    }
  }
  `
}