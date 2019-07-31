import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
const { GET_USER_ID } = Queries;

// our route switches on routeType
const AuthRoute = ({
  component: Component,
  path,
  exact,
  routeType,
  ...rest
}) => (
    <Query query={GET_USER_ID}>
      {({ data }) => {
        // if the route type is "auth" then this route will only render if the
        // user is not logged in - useful for authentication routes
        // like login or register
        if (routeType === "auth") {
          return (
            <Route
              path={path}
              exact={exact}
              render={props =>
                !data._id ? <Component {...props} /> : <Redirect to="/home" />
              }
            />
          );
        } else {
          // otherwise this will be a protected route which will only
          // render the component if the user is logged in
          return (
            <Route
              
              {...rest}
              render={props =>
                data._id ? (
                  <Component {...props} />
                ) : (
                    <Redirect to="/" />
                  )
              }
            />
          );
        }
      }}
    </Query>
  );

export default AuthRoute;