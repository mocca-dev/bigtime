import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({
  component: Component,
  authenticated: user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
