const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, signInWithCustomToken } = require("firebase/auth");
require('dotenv').config()
const config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
};
const app = initializeApp(config)
const auth = getAuth(app)

async function login_email(email, password) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        const uid = user.user.providerData[0].uid
        console.log(uid);
        return uid
    } catch (error) {
        return false
    }
}

async function login_token(token) {
    const user = await signInWithCustomToken(auth, token)
    console.log(user);
    return user.user.uid
}


module.exports = { login_email, login_token }