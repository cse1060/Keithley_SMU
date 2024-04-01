const { db, auth } = require('./firebase')
const bcrypt = require('bcrypt');
const saltRounds = 10

async function addUser(data) {
    const username = data.email.split('@')[0]
    // const hash = await bcrypt.hash(data.password, saltRounds);

    await db.collection('users').doc(data.email).set({
        email: data.email,
        displayName: data.name,
        username: username,
    });
    await auth.createUser({
        email: data.email,
        name: data.name,
        password: data.password,
        emailVerified: false,
        displayName: username,
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