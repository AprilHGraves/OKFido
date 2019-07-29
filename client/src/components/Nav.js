import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../graphql/queries";
const { IS_LOGGED_IN } = Queries;


class Nav extends Component {

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
                        this.props.history.push("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                );
              } else {
                return (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>

                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
};

export default withRouter(Nav);