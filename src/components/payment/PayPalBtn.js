import React from "react";
import { firestore } from "../../firebase/firebase";
import { PayPalButton } from "react-paypal-button-v2";
import PAYPAL from "./paypal-config";

const PayPalBtn = ({ user, setModalVisibility, history }) => (
  <PayPalButton
    options={{
      clientId: PAYPAL.CLIENT_ID
    }}
    amount="0.01"
    onSuccess={(details, data) => {
      if (details.status === "COMPLETED") {
        if (user)
          firestore
            .collection("users")
            .doc(user.uid)
            .set({ active: true })
            .then(() => {
              setModalVisibility(true);
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

export default PayPalBtn;
