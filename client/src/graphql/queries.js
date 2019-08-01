import gql from "graphql-tag";

export default {
  
  GET_USER_ID: gql`
    query IsUserLoggedIn {
      _id @client,
    }
  `,
  GET_USER_PREFS: gql`
    query getUser ($id: ID!){
      user(_id: $id) {
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
  `,
  FETCH_SHIBAS: gql`
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