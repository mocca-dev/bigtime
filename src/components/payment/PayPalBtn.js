import React from "react";
import { firestore } from "../../firebase/firebase";
import { PayPalButton } from "react-paypal-button-v2";
import PAYPAL from "./paypal-config";

const PayPalBtn = ({ user, setModalVisibility, setModalContent, history }) => {
  const showVerifyingModal = () => {
    setModalContent({
      title: "Verificando Pago",
      bodyTxt: "Estamos verificando su pago. Espere por favor.",
      status: "LOADING"
    });
    setModalVisibility(true);
  };

  const showSuccessModal = () => {
    setModalContent({
      title: "Pago Verificado",
      bodyTxt:
        "El pago se efectuó correctamente! Será redirigido en unos segundos.",
      status: "SUCCESS"
    });
    setModalVisibility(true);
  };

  return (
    <PayPalButton
      options={{
        clientId: PAYPAL.CLIENT_ID
      }}
      style={{
        color: "white"
      }}
      amount="0.01"
      onClick={showVerifyingModal}
      onCancel={() => setModalVisibility(false)}
      onSuccess={(details, data) => {
        if (details.status === "COMPLETED") {
          if (user)
            firestore
              .collection("users")
              .doc(user.uid)
              .set({ active: true, paymentData: { ...data } })
              .then(() => {
                showSuccessModal();
                setTimeout(() => {
                  setModalVisibility(false);
                  history.push("/");
                }, 5000);
              })
              .catch(() => {});
        }
      }}
    />
  );
};

export default PayPalBtn;
