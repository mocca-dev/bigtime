import React, { useState, Fragment } from "react";
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
