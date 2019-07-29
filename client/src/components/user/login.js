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
        <Link to="/">okfido</Link>
        <div>
          {this.state.message && (
            <div>
              {this.state.message}
            </div>
          )}
          <div>
            <Link to="/">&lt;</Link>
            <h2>Sign in</h2>
            <div>👋</div>
          </div>
          <div>
            <div>
              <label>
                Email
                <input
                  value={this.state.email}
                  onChange={this.alterState("email")}
                  placeholder="Email"
                />
              </label>
              <label>
                Password
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
              },2000)
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