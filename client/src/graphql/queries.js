import gql from "graphql-tag";

export default {
  SPECIFIC_CONVERSATIONS: gql`
    query SpecificConversations($convoIds: [ID]!) {
      specificConversations(convoIds: $convoIds) {
        _id
        dog {
          id
          url
          age
          name
          photoUrl
        }
        messages {
          _id,
          body,
          author,
          createdAt
        }        
      }
    }
  `,
  ACTIVE_CONVERSATIONS: gql`
    query ActiveConversations {
      activeConversations @client
      conversationFocus @client
    }
  `,
  FETCH_CONVERSATION: gql`
    query FetchConversation($userId: ID!, $dogId: ID!) {
      conversationByUserAndDog(user: $userId, dogId: $dogId) {
        _id
      }
    }
  `,
  FETCH_CONVERSATIONS: gql`
    query FetchConversations($userId: ID!) {
      conversationsByUser(userId: $userId) {
        _id
        dogId
        messages {
          _id,
          body,
          author,
          createdAt
        } 
      }
    }
  `,
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
  GET_USER: gql`
    query GetUser($token: String!) {
      userByToken(token: $token) {
        _id,        
      }
    }
  `,
  GET_USER_PREFS: gql`
    query getUser ($id: ID!){
      user(_id: $id) {
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
  `,
  FETCH_DOGS_FROM_SEARCH: gql`
    query FetchDogsFromSearch($searchArgs: String!) {
      searchDogs(searchArgs: $searchArgs) {
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
  FETCH_DOGS_BASED_DIST_LOC: gql`
    query FetchDogs($distance: String!, $location: String!) {
      dogs(distance: $distance, location: $location) {
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