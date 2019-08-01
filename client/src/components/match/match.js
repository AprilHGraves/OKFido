import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import Queries from '../../graphql/queries';
const { GET_USER_PREFS, GET_USER_ID } = Queries;

const MatchPercent = (props) => {
    return (
      <ApolloConsumer>
        {client => {
          let {_id} = client.readQuery({ query: GET_USER_ID })
          console.log(_id)
          return (
            <Query query={GET_USER_PREFS} variables={{ id: _id }}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                console.log(data.user)
                console.log(props.dog)
                // size, gender, age
                let matchedCriteria = {
                  hasChildren: false,
                  hasDogs: false,
                  hasCats: false,
                  likedSizes: false,
                  likedGenders: false,
                  likedAges: false,
                }
                Object.keys(props.dog).forEach(attr => {
                  if (attr === "age"){
                    matchedCriteria.likedAges = data.user.likedAges.includes(props.dog["age"].toLowerCase())
                  } else if (attr === "gender"){
                    matchedCriteria.likedGenders = data.user.likedGenders.includes(props.dog["gender"].toLowerCase())
                  } else if (attr === "size"){
                    matchedCriteria.likedSizes = data.user.likedSizes.includes(props.dog["size"].toLowerCase())
                  } else if (attr === "environment"){
                    if (props.dog.environment.children === null && !data.user.hasChildren) {
                      matchedCriteria.hasChildren = true;
                    }
                    if (props.dog.environment.cats === null && !data.user.hasCats) {
                      matchedCriteria.hasCats = true;
                    }
                    if (props.dog.environment.dogs === null && !data.user.hasDogs) {
                      matchedCriteria.hasCats = true;
                    }
                    else if (props.dog.environment.children 
                      && props.dog.environment.cats
                      && props.dog.environment.dogs){
                        matchedCriteria.hasChildren = (data.user.hasChildren === props.dog.environment.children) 
                        matchedCriteria.hasDogs = (data.user.hasDogs === props.dog.environment.dogs) 
                        matchedCriteria.hasCats = (data.user.hasCats === props.dog.environment.cats) 
                      }
                  }
                })
                let numMatches = Object.values(matchedCriteria).filter(val => val).length;
                let percent = Math.floor((numMatches / 6) * 100);
                return `${percent}% Match`;
              }}
            </Query>
          )
        }}
        </ApolloConsumer>
    )

}

export default MatchPercent;