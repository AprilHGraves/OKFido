import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { REGISTER_USER, VERIFY_USER } = Mutations;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "email",
      message: "Email is required",
      email: "",
      password: "",
    };
    this.alterState = this.alterState.bind(this);
    this.switchPage = this.switchPage.bind(this);
  }


  getMsg(field, value) {
    let msg = "";
    switch (field) {
      case "email":
        const emailMatch = value.match(/\w+@\w+\.\w+/);
        if (value === "") {
          msg = "Email is required";
        } else if (!emailMatch) {
          msg = "Invalid email address";
        }
        return msg
      case "password":
        if (value.length === 0) {
          msg = "Password is required";          
        } else if (value.length < 6) {
          msg = "That password is too short";
        }
        return msg
      default:
        return msg
    }
  }

  alterState(key) {
    return (event) => {
      let msg = this.getMsg(key, event.target.value);
      this.setState({[key]: event.target.value, message: msg});
    }
  }

  switchPage(page) {
    return (event) => {
      event.preventDefault();
      if (page !== "password" || !this.state.message) {
        this.setState({page: page, message: this.getMsg(page, this.state[page])});
      }
    }
  }

  displayPage() {
    switch (this.state.page) {
      case "email":
        return (
          <div className="signup">
            <div className="auth-header">
              <Link to="/">&lt;</Link>
              <h2>About you</h2>
              
            </div>
            <div>
              <h1 className="auth-signup-header">Welcome! Who are you?</h1>
              <button className="auth-fb-button">
                <i className="fab fa-facebook-f" />
                SIGN UP WITH FACEBOOK
              </button>
              <p>We never post to Facebook</p>

              <div className="auth-separator">
                <span className="auth-separator-line"></span>
                <span className="auth-separator-text">OR</span>
              </div>
              <div className="auth-error-inline-form">{this.state.message}</div>
              <div className="auth-form">
                <div className="auth-input">
                  <input
                    value={this.state.email}
                    onChange={this.alterState("email")}
                    placeholder="your.email@example.com"
                  />
                  {/* <div className="auth-inline-input-icon">{this.state.message ? "!" : <i className="fas fa-check" />}</div> */}
                </div>
              </div>
            </div>
            <button 
              className={this.state.message ? "gray-bg" : "blue-bg"}
              onClick={this.switchPage("password")}
            >
              NEXT
            </button>
          </div>
        )
      case "password":
        return (
          <div className="signup">
            <div className="auth-header">
              <button onClick={this.switchPage("email")}>&lt;</button>
              <h2>About you</h2>
            </div>
            <div className="auth-form">
              <h1 className="auth-signup-header">Create a password</h1>

              <div className="auth-input-signup-password-label">
                <div>Password</div>
                <span className="auth-error-inline-form">{this.state.message}</span>
              </div>            
              <div className="auth-input-signup-password">
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.alterState("password")}
                  placeholder="6 characters minimum"
                />
                {/* <div>{this.state.message ? "!" : <i className="fas fa-check" />}</div> */}
              </div>
            </div>
            <ApolloConsumer>
              {client => (
                
                <Mutation
                  mutation={REGISTER_USER}
                  onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    client
                      .mutate({ mutation: VERIFY_USER, variables: { token } })
                      .then(({ data }) => {
                        client.writeData({
                          data: {
                            _id: data.verifyUser._id
                          }
                        });
                      });
                  }}
                  onError={err => {
                    this.setState({message: err.message.slice(15)});
                  }}
                >
                  {register => (
                    <button
                        className={this.state.message ? "gray-bg" : "blue-bg"}
                        onClick={e => {
                          e.preventDefault();
                          register({
                            variables: {
                              email: this.state.email,
                              password: this.state.password
                            }
                          });
                        }}
                      >
                        SIGN UP
                    </button>
                  )}
                </Mutation>
              )}
            </ApolloConsumer>
          </div>
        )
      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div className="light-blue-bg">
        <Link to="/">
          <div className="nav">
            <div className="logo">
              <i className="fas fa-dog"></i>
              <h2>okfido</h2>
            </div>
          </div>
        </Link>
        <div className="auth-form-container">
          {this.displayPage()}
        </div>
      </div>
    )
  }
}

export default Register