import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
const { CREATE_MESSAGE } = Mutations;
const { ACTIVE_CONVERSATIONS, SPECIFIC_CONVERSATIONS } = Queries;

class Conversations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimized: false,
      showSideConversations: false,
      msg: ""
    };
    this.toggleSideConvos = this.toggleSideConvos.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate() {
    if (!this.inside && this.state.showSideConversations) {
      setTimeout(() => { this.inside = document.getElementById("side-convos-list") }, 100);
      document.addEventListener("mousedown", this.handleClickOutside);
    } else if (this.inside && !this.state.showSideConversations) {
      this.inside = undefined;
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.inside && !this.inside.contains(event.target) && !document.getElementById('toggle-side-convos').contains(event.target)) {
      this.setState({ showSideConversations: false });
    }
  }

  toggleSideConvos(event) {
    if (this.state.showSideConversations) {
      this.setState({ showSideConversations: false });
    } else {
      this.setState({ showSideConversations: true });
    }
  }

  getDate(str) {
    const date = new Date(Number(str));
    const dStr = date.toString();
    const dm = dStr.match(/\w+ (.+) \d+:/);
    const tm = dStr.match(/\d+ \d+ (.+):\d+ /);
    return `${dm[1]} ${tm[1]}`
  }

  generateDogResponse(dog) {
    const responseArray = [
      `Hi! I'm ${dog.name}. Please visit my page to learn more about me.`,
      'woof woof *scratch* *head tilt*',
      'bark bark *whine*',
      '*chases tail*',
      '*begging eyes* Please visit me on petfinder.',
      `I'd love to live with you! Do you want a dog named ${dog.name}?`,
      `Uo.oU arf?`,
      `U^w^U woof`,
      'meow? err.. woof woof',
      'yap yap woof'
    ];
    const randomIdx = Math.floor(Math.random() * 10);
    return responseArray[randomIdx]
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
                          <div id="side-convos" className="side-convos">
                            {this.state.showSideConversations && (
                              <ul id="side-convos-list" className="side-convos-list">
                                {convos.map(convo => {
                                  return (
                                    <li key={convo._id} className="main-convo-header">
                                      <ApolloConsumer>
                                        {client => (
                                          <button
                                            className="main-convo-header-left"
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
                                          </button>
                                        )}
                                      </ApolloConsumer>
                                      {this.closeConversation(convo._id)}
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                            <div
                              id="toggle-side-convos"
                              className="side-convo-count"
                              onClick={this.toggleSideConvos}
                            >
                              <i className="fas fa-comment" />&nbsp;
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
                                    this.setState({ minimized: true, showSideConversations: false })
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
                                {mainConvo.messages.length > 0 ? (
                                  <div>
                                    {mainConvo.messages.map(msg => (
                                      <div key={msg._id} className="message-container">
                                        <div className="message-date"> 
                                          {this.getDate(msg.createdAt)}
                                        </div>
                                        <div className={`message ${msg.author==="user"?"user-message":"pet-message"}`}>
                                          {msg.body}

                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ):(
                                  <div className="empty-convo">
                                    <img src="//cdn.okccdn.com/media/img/illustrations/wright-png/admirer-bg@2x.png"  alt="Illustration"/>
                                    <h3>
                                      Write {mainConvo.dog.name} a message
                                    </h3>
                                    <p>
                                      You look bored. Start messaging now.
                                    </p>
                                  </div>

                                )}
                              </div>
                              <div className="main-convo-message-send">
                                <input
                                  className="main-convo-message-send-input"
                                  value={this.state.msg}
                                  onChange={(e) => this.setState({msg: e.target.value})}
                                  placeholder="Say something..."
                                />
                                <Mutation
                                  mutation={CREATE_MESSAGE}
                                >
                                  {createMessage => (
                                    <button
                                      className="main-convo-message-send-btn"
                                      onClick={e => {
                                        e.preventDefault();
                                        createMessage({
                                          variables: {
                                            body: this.state.msg,
                                            conversation: mainConvo._id,
                                            author: "user"
                                          }                                          
                                        });
                                        setTimeout(() => {
                                          createMessage({
                                            variables: {
                                              body: this.generateDogResponse(mainConvo.dog),
                                              conversation: mainConvo._id,
                                              author: "dog"
                                            }
                                          });
                                        }, 3000)
                                        this.setState({msg: ""});
                                      }}
                                    >
                                      SEND
                                    </button>
                                  )}
                                </Mutation>
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