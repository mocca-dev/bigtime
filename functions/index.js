const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const pass = functions.config().gmail.pass;

admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ active: false, email: user.email });
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nanodesign21@gmail.com",
    pass
  }
});

exports.sendMail = functions.firestore
  .document("help-msg/{helpMsgID}")
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    if (document) {
      const dest = document.user.email;

      const name = document.user.name;
      const message = document.messages[document.messages.length - 1].message;
      const appVersion = document.appVersion;

      const mailOptions = {
        from: `${name} ${dest}`,
        to: dest,
        subject: "Consulta desde BigTime",
        html: `
          <h2>${name}</h2>
          <h4>version: ${appVersion}</h4>
          <br />
          <p>${message}</p>
          `
      };

      return transporter.sendMail(mailOptions, (erro, info) => {
        return null;
      });
    }
  });
