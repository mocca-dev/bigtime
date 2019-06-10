import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { LoadingSVG } from "./../Icons";

const PasswordelessSigning = ({ sendEmail, sending }) => {
  const [email, setEmail] = useState("");
  return (
    <Fragment>
      <input
        type="email"
        placeholder="CORREO ELECTRONICO"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        className="btn btn-wide"
        onClick={() => sendEmail(email)}
        disabled={!email.length || sending}
      >
        {sending ? (
          <div className="loading-container">
            <LoadingSVG />
            <div>ENVIANDO</div>
          </div>
        ) : (
          "ENVIAR"
        )}
      </button>
    </Fragment>
  );
};

export default PasswordelessSigning;

PasswordelessSigning.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired
};
