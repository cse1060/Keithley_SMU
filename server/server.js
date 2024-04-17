const express = require('express');
var bodyParser = require('body-parser');
const { addUser, getUser, getToken } = require('./database/User');
const { login_email, login_token } = require('./login')
const { db } = require("./database/firebase")
const { FieldValue } = require("firebase-admin/firestore")
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
        console.log(req.body);
        const uid = await login_token(req.body.token)
        res.json({ success: true, uid: uid })
    } catch (error) {
        res.json({ success: false })
    }
})

app.post("/add_experiment", async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body;
        // await db.collection('users').doc(data.uid).set({
        //     csv: data.csv
        // }, { merge: true })
        var finalResults = []

        data.results.map((arr, idx) => {
            {
                finalResults.push({
                    A1: arr[0],
                    T1: arr[1],
                    A2: arr[2],
                    T2: arr[3],
                    A3: arr[4],
                })
            }
        })

        var userDocRef = db.collection('users').doc(data.uid);
        userDocRef.update({
            experiments: FieldValue.arrayUnion({
                date: getCurrentDateAsString(),
                experiment_details: data.expDetails,
                expName: data.expName,
                results: finalResults,
                csv: data.csv,
            })
        })

        res.json({ success: true, message: "CSV File ADDED" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, 'error': error })
    }
})

app.post("/profile_details", async (req, res) => {
    const uid = req.body.uid;
    const docRef = db.collection('users').doc(uid)
    const doc = await docRef.get()
    if (!doc.exists) {
        console.log('No such document!');
        res.json({ "success": false, "message": "Error!!" })
    } else {
        console.log('Document data:', doc.data());
        res.json({ "success": true, "doc": doc.data() })
    }
})

// app.get("/csv_file" , async(req , res) => {

// })

app.listen(PORT, () => {
    console.log(`Server is listening at port :${PORT}`);
});

function getCurrentDateAsString() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}