import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { LogoSVG } from "./Icons";

const InactiveUserScreen = ({ signOut, history }) => (
  <section className="inactive-container">
    <LogoSVG />
    <p>
      Usted se encuentra registrado pero su cuenta aun no ha sido activada. Para
      poder activar su cuenta deberá realizar el pago del cupón que le fue
      enviado a la dirección de e-mail brindada por usted.
    </p>
    <button className="btn btn-wide">REENVIAR CUPON DE PAGO</button>
    <button
      className="btn btn-wide"
      onClick={() => {
        signOut();
        history.push("/login");
      }}
    >
      SALIR
    </button>
  </section>
);

export default withRouter(InactiveUserScreen);

InactiveUserScreen.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
