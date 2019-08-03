import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';
import Queries from '../../graphql/queries';
const { ACTIVE_CONVERSATIONS, SPECIFIC_CONVERSATIONS } = Queries;

class Conversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
      showSideConversations: false
    };
  }

  closeConversation(convoId) {
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="convo-button"
            onClick={(e) => {
              e.preventDefault();
              const res = client.readQuery({
                query: ACTIVE_CONVERSATIONS
              });
              const convoArray = res.activeConversations.slice(0);
              const removeId = convoArray.indexOf(convoId);
              convoArray.splice(removeId, 1);
              client.writeQuery({
                query: ACTIVE_CONVERSATIONS,
                data: {
                  activeConversations: convoArray,
                  conversationFocus: convoArray[0] || ""
                }
              })
            }}
          >
            x
          </button>
        )}
      </ApolloConsumer>
    )
  }

  render() {

    return (
      <Query query={ACTIVE_CONVERSATIONS}>
        {({ loading, error, data: { conversationFocus, activeConversations} }) => {
          if (loading) return ""
          if (error) return `Error! ${error.message}`
          if (activeConversations.length === 0) {
            return (
              <div>
              </div>
            )
          } else {
            return (
              <Query
                query={SPECIFIC_CONVERSATIONS}
                variables={{convoIds: activeConversations}}
              >
                {({ loading, error, data}) => {
                  if (data.specificConversations) {
                    const convos = data.specificConversations.slice(0);
                    let mainIdx = 0;
                    for (let i=0,fin=convos.length; i<fin; i++) {
                      if (convos[i]._id === conversationFocus) {
                        mainIdx = i;
                        break;
                      }
                    }
                    const mainConvo = convos[mainIdx];
                    convos.splice(mainIdx, 1);
                    return (
                      <div className="conversations">
                        {convos.length > 0 && (
                          <div>
                            {this.state.showSideConversations && (
                              <ul className="side-conversations-list">
                                {convos.map(convo => {
                                  return (
                                    <li key={convo._id} className="convo-header">
                                      <ApolloConsumer>
                                        {client => (
                                          <div
                                            onClick={() => {
                                              client.writeQuery({
                                                query: ACTIVE_CONVERSATIONS,
                                                data: {
                                                  activeConversations,
                                                  conversationFocus: convo._id
                                                }
                                              })
                                            }}
                                          >
                                            <img src={convo.dog.photoUrl} className="convo-dog-pic" alt='profile' />
                                            <span>{convo.dog.name}, {convo.dog.age}</span>
                                          </div>
                                        )}
                                      </ApolloConsumer>
                                      {this.closeConversation(convo._id)}
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                            <div className="side-convo-count">
                              <i className="fas fa-comment" />
                              {convos.length}
                            </div>
                          </div>
                        )}
                        <div className="main-convo">
                          <div className="main-convo-header">
                            <button
                              className="main-convo-header-left"
                              onClick={(e) => {
                                e.preventDefault();
                                if (this.state.minimized) {
                                  this.setState({ minimized: false })
                                } else {
                                  this.props.history.push(`/dogs/${mainConvo.dog.id}`)
                                }
                              }}
                            >
                              <img src={mainConvo.dog.photoUrl} className="convo-dog-pic" alt='profile' />
                              <span>{mainConvo.dog.name}, {mainConvo.dog.age}</span>
                            </button>
                            <div>
                              {!this.state.minimized && (
                                <button
                                  className="convo-button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ minimized: true })
                                  }}
                                >
                                  -
                                </button>

                              )}
                              {this.closeConversation(mainConvo._id)}
                            </div>
                          </div>
                          {!this.state.minimized && (
                            <div>
                              <div className="main-convo-message-list">
                                <div className="empty-convo">
                                  <img src="//cdn.okccdn.com/media/img/illustrations/wright-png/admirer-bg@2x.png" />
                                  <h3>
                                    Write {mainConvo.name} a message
                                  </h3>
                                  <p>
                                    You look bored. Start messaging now.
                                  </p>
                                </div>
                              </div>
                              <div className="main-convo-message-send">
                                <input
                                  className="main-convo-message-send-input"
                                  placeholder="Say something..."
                                />
                                <button
                                  className="main-convo-message-send-btn"
                                >
                                  SEND
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>                                      
                    )
                  } else {
                    return <div></div>
                  }
                }}
              </Query>
            )
          }

        }}
      </Query>


    )
  }
}

export default withRouter(Conversations)