import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <div>a</div>
          // <Redirect
          //   to={{ pathname: "/login", state: { from: props.location } }}
          // />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
