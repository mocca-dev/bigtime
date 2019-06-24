import React, { useState } from "react";
import PropTypes from "prop-types";
import withAuthentication from "./withAuthentication";
import { LogoSVG } from "./Icons";
import PayPalBtn from "./payment/PayPalBtn";
import Modal from "./Modal";

const InactiveUserScreen = ({ user, signOut, props }) => {
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentModalContent, setPaymentModalContent] = useState({
    title: "",
    bodyTxt: "",
    status: ""
  });

  const signOutOK = () => {
    return new Promise(function(resolve, reject) {
      signOut();
      props.history.push("/login");
      resolve(true);
    });
  };

  return (
    <section className="inactive-container">
      {showSignOutModal && (
        <Modal
          title="Salir"
          bodyTxt="Está seguro que desea cerrar sesión?"
          hideModal={() => setShowSignOutModal(false)}
          okAction={signOutOK}
          cancelAction={() => new Promise((resolve, reject) => resolve(null))}
        />
      )}
      {showPaymentModal && (
        <Modal
          title={paymentModalContent.title}
          bodyTxt={paymentModalContent.bodyTxt}
          status={paymentModalContent.status}
          preventOutside={true}
        />
      )}
      <LogoSVG />
      <p className="inactive-text">
        Usted se encuentra registrado pero su cuenta aun no ha sido activada.
        Para poder activar su cuenta deberá realizar el pago del cupón que le
        fue enviado a la dirección de e-mail brindada por usted.
      </p>
      <PayPalBtn
        user={user}
        setModalVisibility={flag => setShowPaymentModal(flag)}
        setModalContent={content => setPaymentModalContent(content)}
        history={props.history}
      />
      <button
        className="btn btn-ghost"
        onClick={() => setShowSignOutModal(true)}
      >
        SALIR
      </button>
    </section>
  );
};

export default withAuthentication(InactiveUserScreen);

InactiveUserScreen.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
