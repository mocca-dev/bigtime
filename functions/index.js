const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Fireabase!");
// });

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ active: false, email: user.email })
    .then(writeResult => {
      // write is complete here
      console.log(writeResult);
    });
});
