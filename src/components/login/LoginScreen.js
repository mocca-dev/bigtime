import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import withAuthentication from "./../withAuthentication";
import PasswordlessSigning from "./PasswordlessSigning";

import { GoogleSVG, LogoSVG, HelpSVG } from "./../Icons";
import StatusMsg from "./StatusMsg";
import Help from "../Help";

const LoginScreen = ({ signInWithGoogle, props }) => {
  const [backFromEmail, setBackFromEmail] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    content: "",
    color: "",
    visibility: false
  });

  return (
    <div className="login">
      <span
        className="btn-help"
        onClick={() => {
          setShowHelp(true);
        }}
      >
        <HelpSVG />{" "}
      </span>
      {showHelp && (
        <Help
          close={() => setShowHelp(false)}
          user={{
            uid: "a",
            displayName: "anonymus",
            email: ""
          }}
        />
      )}
      <LogoSVG />
      {!backFromEmail ? (
        <Fragment>
          <div>Bienvenido</div>
          {statusMsg.visibility && (
            <StatusMsg content={statusMsg.content} color={statusMsg.color} />
          )}
          <PasswordlessSigning
            location={props.location}
            history={props.history}
            setStatusMsg={status => setStatusMsg(status)}
            setBackFromEmail={value => setBackFromEmail(value)}
          />
          <button
            className="btn btn-wide btn-google"
            onClick={() => signInWithGoogle()}
          >
            <span className="btn-wide-body-w-icon">
              <GoogleSVG />
              <span>INGRESAR CON GOOGLE</span>
            </span>
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div>Gracias por volver</div>
          <StatusMsg content={statusMsg.content} color={statusMsg.color} />
        </Fragment>
      )}
    </div>
  );
};

export default withAuthentication(LoginScreen);

LoginScreen.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired
};
