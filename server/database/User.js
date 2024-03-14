const { db, auth } = require('./firebase')
const bcrypt = require('bcrypt');
const saltRounds = 10

async function addUser(data) {
    // const username = data.email.split('@')[0]
    // const hash = await bcrypt.hash(data.password, saltRounds);

    // const res = await db.collection('users').doc(data.email).set({
    //     email: data.email,
    //     name: data.name,
    //     username: username,
    //     password: hash
    // });
    const user = await auth.createUser({
        email: data.email,
        password: data.password,
        emailVerified: false,
        // photoURL:
        // phoneNumber:
        // displayName:
        disabled: false
    })
}

async function getUser(email) {
    const user = await auth.getUserByEmail(email)
    return user;
}

async function getToken(userId) {
    const token = await auth.createCustomToken(userId)
    return token;
}

module.exports = { addUser, getUser, getToken }