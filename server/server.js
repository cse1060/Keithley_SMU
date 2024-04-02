const express = require('express');
var bodyParser = require('body-parser');
const { addUser, getUser, getToken } = require('./database/User');
const { login_email, login_token } = require('./login')
var cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const PORT = 8000;



app.get('/', async (req, res) => {
    // const data = {
    //     email: 'pratham@gmail.com',
    //     name: 'pratham Gupta',
    //     password: '12345678'
    // }

    // await addUser(data)

    // const user = await getUser('pratham@gmail.com')
    // if (user) {
    //     const token = await getToken(user.uid)
    //     res.json({ token: token })
    // } else {
    //     res.json({ 'success': false })
    // }

});
app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const user = await getUser(req.body.email)
        res.json({ success: false, message: "User already exists" })
    } catch (error) {
        await addUser(req.body)
        res.json({ success: true, message: "User added successfully" })
    }
})

app.post("/signin", async (req, res) => {
    // console.log(req.body);
    try {
        const uid = await login_email(req.body.email, req.body.password)
        if (uid !== false) {
            // console.log(uid, '****');
            const CustomToken = await getToken(uid)
            // console.log(CustomToken);
            res.json({ success: true, message: "User signed in", CustomToken: CustomToken })
        } else {
            res.json({ success: false, message: "User does not exists" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User does not exists" })
    }
})
app.post("/signin_token", async (req, res) => {
    try {
        await login_token(req.body.token)
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false })
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening at port :${PORT}`);
}); 