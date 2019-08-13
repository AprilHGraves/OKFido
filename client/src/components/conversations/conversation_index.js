import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import Queries from '../../graphql/queries';
const { GET_USER, FETCH_CONVERSATIONS, FETCH_ONE_DOG, ACTIVE_CONVERSATIONS } = Queries;

const ConvoIndex = () => {

  const getDate = (str) => {
    const d = new Date(Number(str));
    return d.toDateString();
  };
  return (
    <div className="conversations-list">
      <h2>Messages</h2>
      <Query query={GET_USER} variables={{ token: localStorage.getItem("auth-token") }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error.message}`
          const userId = data.userByToken._id;
          return (
            <Query query={FETCH_CONVERSATIONS} variables={{ userId: userId }}>
              {({ loading, error, data: {conversationsByUser} }) => {
                if (loading || error) return <ul className="convo-list">Loading...</ul>
                  if (conversationsByUser.length === 0) {
                    return <div>Go message a dog!</div>
                  }
                  return (
                    <ul className="convo-list">
                      {conversationsByUser.map(convo => {
                        const dogMessages = convo.messages.filter(c => c.author === "dog");
                        const lastMessage = dogMessages[dogMessages.length - 1];
                        if (!lastMessage) {return <li key={convo._id}></li>}
                        return (
                          <ApolloConsumer key={convo._id}>
                            {client => (
                              <Query
                                key={convo.dogId}
                                query={FETCH_ONE_DOG}
                                variables={{ dogId: convo.dogId }}
                              >
                                {({ loading, error, data }) => {
                                  if (loading || error) {
                                    return <li></li>
                                  }
                                  const dog = data.dog;
                                  return (
                                    <li
                                      className="convo-li"
                                      onClick={e => {
                                        e.preventDefault();
                                        const res = client.readQuery({
                                          query: ACTIVE_CONVERSATIONS
                                        });
                                        const convoArray = res.activeConversations.slice(0);
                                        if (!convoArray.includes(convo._id)) {
                                          convoArray.push(convo._id);
                                        }
                                        client.writeQuery({
                                          query: ACTIVE_CONVERSATIONS,
                                          data: {
                                            activeConversations: convoArray,
                                            conversationFocus: convo._id
                                          }
                                        })
                                      }}
                                    >
                                      <img className="dog-convo-pic" src={dog.photoUrl} alt="Dog"/>
                                      <div className="dog-convo-info">
                                        <div className="dog-convo-info-top">
                                          <div className="dog-convo-info-name">{dog.name}</div>
                                          <div>{getDate(lastMessage.createdAt)}</div>
                                        </div>
                                        <p className="dog-convo-info-message">{lastMessage.body}</p>
                                      </div>
                                    </li>
                                  )
                                }}
                              </Query>
                          
                              
                            )}
                          </ApolloConsumer>

                        )
                      })}
                    </ul>
                  )

              }}

            </Query>
          )
        }}
      </Query>
    </div>
  );
}

export default ConvoIndex;