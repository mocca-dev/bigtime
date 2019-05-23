import React, { useState } from "react";

const PasswordelessSigning = ({ sendEmail }) => {
  const [email, setEmail] = useState("");
  return (
    <React.Fragment>
      <input
        type="email"
        placeholder="CORREO ELECTRONICO"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button className="btn btn-wide" onClick={() => sendEmail(email)}>
        ENVIAR
      </button>
    </React.Fragment>
  );
};

export default PasswordelessSigning;
