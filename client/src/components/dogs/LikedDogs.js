import React from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
const { LIKED_DOGS, GET_USER_ID, FETCH_ONE_DOG } = Queries;

const LikedDogs = () => {
  return (
    <div>
      <div className="sub-nav">
        <h1>Likes</h1>
      </div>
      <Query query={GET_USER_ID} variables={{ token: localStorage.getItem("auth-token") }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          const userId = data.userByToken._id;
          return (
            <Query query={LIKED_DOGS} variables={{ userId: userId }}>
              {({ data }) => {
                if (data && data.likedDogs) {
                  if (data.likedDogs.dogIds.length === 0) {
                    return <div>Go like some dogs!</div>
                  }
                  return (
                    <ul className="liked-dogs">
                      {data.likedDogs.dogIds.map(dogId => {

                        return (
                          <Query
                            key={dogId}
                            query={FETCH_ONE_DOG}
                            variables={{ dogId: dogId }}
                          >
                            {({ loading, error, data }) => {
                              if (error) {
                                return <li></li>
                              }
                              const dog = data.dog;
                              if (dog) {
                                return (
                                  <li>
                                    <Link to={`/dogs/${dogId}`} className="liked-dog">
                                      <img src={dog.photoUrl} alt="profile" className="liked-dog-pic"></img>
                                      <div>
                                        <div>
                                          <div className="liked-dog-line-1">{dog.name}, {dog.age}</div>
                                          <div className="liked-dog-line-2">{dog.contact.address.city}, {dog.contact.address.state}</div>
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                )
                              } else {
                                return <li></li>
                              }
                            }}
                          </Query>
                        
                        )
                      })}
                    </ul>
                  )
                } else {
                  return <ul></ul>
                }
              }}

            </Query>
          )
        }}
      </Query>
    </div>
  );
}

export default LikedDogs;