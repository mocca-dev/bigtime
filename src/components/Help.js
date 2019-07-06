import React, { useState } from "react";

import { firestore, firebase } from "../firebase/firebase";
import { CloseSVG, LoadingSVG, CheckSVG } from "./Icons";

const sendMsg = (user, message, onSending, onSent, close) => {
  const doc = firestore.collection("help-msg").doc(user.uid);
  onSending(true);
  doc.get().then(help => {
    if (!help.exists) {
      doc
        .set({
          user: { name: user.displayName, email: user.email },
          messages: [
            {
              date: Date.now(),
              message: message
            }
          ],
          appVersion: process.env.REACT_APP_VERSION
        })
        .then(() => {
          onSending(false);
          onSent(true);
          setTimeout(() => {
            close();
          }, 2000);
        });
    } else {
      doc
        .update({
          user: { name: user.displayName, email: user.email },
          messages: firebase.firestore.FieldValue.arrayUnion({
            date: Date.now(),
            message: message
          })
        })
        .then(() => {
          onSending(false);
          onSent(true);
          setTimeout(() => {
            close();
          }, 2000);
        });
    }
  });
};

const Help = ({ close, user }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState("");
  const [sent, setSent] = useState("");
  const [localUser, setLocalUser] = useState(user);

  return (
    <span className="help-container">
      <header>
        <h2>Ayuda</h2>
        <button className="close-btn" onClick={close}>
          <CloseSVG />
        </button>
      </header>
      <section>
        <p>
          Si tenes alguna duda o sugerencia por favor escribinos y vamos a
          responderte cuanto antes.
        </p>
        {user.uid === "a" && (
          <div>
            <label htmlFor="name">Nombre y Apellido</label>
            <input
              type="text"
              name="name"
              onChange={e =>
                setLocalUser({ ...localUser, displayName: e.target.value })
              }
              disabled={sending || sent}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={e =>
                setLocalUser({ ...localUser, email: e.target.value })
              }
              disabled={sending || sent}
            />
          </div>
        )}
        <textarea
          name=""
          id=""
          row="30"
          maxLength="500"
          onChange={e => setMessage(e.target.value)}
          disabled={sending || sent}
        />
        <div>
          {message.length}/500 {message.length >= 480 && "!"}
        </div>
        <button
          className="btn btn-default"
          onClick={() =>
            sendMsg(localUser, message, setSending, setSent, close)
          }
          disabled={
            user.uid === "a"
              ? !localUser.displayName ||
                !localUser.email ||
                !message.length ||
                !message ||
                sending ||
                sent
              : !message || sending || sent
          }
        >
          {!sending && !sent ? (
            "Enviar Consulta"
          ) : sending ? (
            <span className="btn-content-svg">
              <LoadingSVG /> Enviando
            </span>
          ) : (
            <span className="btn-content-svg green-fill">
              <CheckSVG />
              <span>Enviado</span>
            </span>
          )}
        </button>
      </section>
    </span>
  );
};

export default Help;
