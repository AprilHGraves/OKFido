import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { REGISTER_USER } = Mutations;

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
          <div>
            <div>
              <Link to="/">&lt;</Link>
              <h2>About you</h2>
              <h1>Welcome! Who are you?</h1>
            </div>
            <div>
              <button>
                <i className="fab fa-facebook-f" />
                SIGN UP WITH FACEBOOK
              </button>
              <div>We never post to Facebook</div>
              <div>
                <span></span>
                <span>OR</span>
              </div>
              <div>{this.state.message}</div>
              <div>
                <input
                  value={this.state.email}
                  onChange={this.alterState("email")}
                  placeholder="your.email@example.com"
                />
                <div>{this.state.message ? "!" : <i className="fas fa-check" />}</div>
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
          <div>
            <div>
              <button onClick={this.switchPage("email")}>&lt;</button>
              <h2>About you</h2>
              <h1>Create a password</h1>
            </div>
            <div>
              <div>
                <div>Password</div>
                <span>{this.state.message}</span>
              </div>            
              <div>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.alterState("password")}
                  placeholder="6 characters minimum"
                />
                <div>{this.state.message ? "!" : <i className="fas fa-check" />}</div>
              </div>
            </div>            
            <Mutation
              mutation={REGISTER_USER}
              onCompleted={data => {
                const { token } = data.register;
                localStorage.setItem("auth-token", token);
                this.props.history.push("/onboarding");
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
          </div>
        )
      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div className="light-blue-bg">
        <Link to="/">okfido</Link>
        {this.displayPage()}
      </div>
    )
  }
}

export default Register