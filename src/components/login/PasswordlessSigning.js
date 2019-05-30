import React, { useState } from "react";
import { LoadingSVG } from "./../Icons";

const PasswordelessSigning = ({ sendEmail, sending }) => {
  const [email, setEmail] = useState("");
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default PasswordelessSigning;
