import React, { useState } from "react";
import PropTypes from "prop-types";
import withAuthentication from "./withAuthentication";
import { LogoSVG } from "./Icons";
import PayPalBtn from "./payment/PayPalBtn";
import Modal from "./Modal";

const InactiveUserScreen = ({ user, signOut, props }) => {
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      {showSuccessModal && (
        <Modal
          title="Pago Verificado"
          bodyTxt="El pago se efectuó correctamente!!"
        />
      )}
      <LogoSVG />
      <p className="inactive-text">
        Usted se encuentra registrado pero su cuenta aun no ha sido activada.
        Para poder activar su cuenta deberá realizar el pago del cupón que le
        fue enviado a la dirección de e-mail brindada por usted.
      </p>
      {/* <button className="btn btn-wide">REENVIAR CUPON DE PAGO</button> */}
      <PayPalBtn
        user={user}
        setModalVisibility={flag => setShowSuccessModal(flag)}
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
