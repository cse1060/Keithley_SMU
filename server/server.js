const express = require('express');
const { addUser, getUser, getToken } = require('./database/User');

const app = express();
const PORT = 8000;



app.get('/', async (req, res) => {
    // const data = {
    //     email: 'pratham@gmail.com',
    //     name: 'pratham Gupta',
    //     password: '12345678'
    // }
    // await addUser(data)

    const user = await getUser('pratham@gmail.com')
    if (user) {
        const token = await getToken(user.uid)
        res.json({ token: token })
    } else {
        res.json({ 'success': false })
    }

});

app.listen(PORT, () => {
    console.log(`Server is listening at port :${PORT}`);
}); 