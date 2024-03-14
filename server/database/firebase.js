var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase_keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };