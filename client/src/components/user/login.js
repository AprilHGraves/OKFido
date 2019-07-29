import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { LOGIN_USER } = Mutations;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
    this.alterState = this.alterState.bind(this);
  }

  alterState(key) {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  render() {
    return (
      <div className="light-blue-bg">
        {this.state.message && (
          <div className="auth-error">
            {this.state.message}
          </div>
        )}
        <Link to="/">
          <div className="nav">
            <div className="logo">
              <i className="fas fa-dog"></i>
              <h2>okfido</h2>
            </div>
          </div>
        </Link>
        <div className="auth-form-container">
          <div className="auth-header">
            <Link to="/home">&lt;</Link>
            <h2>Sign in</h2>
          </div>
          <div className="auth-form">
            <div className="auth-emoji">
              <span role="img" aria-label="handwave">👋</span>
            </div>

            <div className="auth-input">
              <label>
                <h2> Email </h2>
                <input
                  value={this.state.email}
                  onChange={this.alterState("email")}
                  placeholder="Email"
                />
              </label>
            </div>
            <div className="auth-input">
              <label>
                <h2> Password </h2>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.alterState("password")}
                  placeholder="Password"
                />
              </label>
            </div>
          </div>
          <Mutation
            mutation={LOGIN_USER}
            onCompleted={data => {
              const { token } = data.login;
              localStorage.setItem("auth-token", token);
              this.props.history.push("/");
            }}
            onError={err => {
              setTimeout(() => {
                this.setState({ message: ""});
              },3500)
              this.setState({ message: err.message.slice(15) })
            }
            }
          >

            {login => (
              <button
                className="blue-bg"
                onClick={e => {
                  e.preventDefault();
                  login({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                SIGN IN
                </button>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default Login