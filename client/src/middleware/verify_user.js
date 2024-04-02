import axios from "axios";

export default async function verify_user() {
    const data = await axios.get("http://127.0.0.1:5000/loginToken");
    const token = await data.data.token
    const path = window.location.pathname
    // console.log(path);
    if (token === '') {
        if (path !== '/login' || path !== 'signup') {
            return { success: 0, uid: "" }
        } else return { success: 1 }
    } else {
        const res = await axios.post('http://localhost:8000/signin_token', { token: token })
        console.log(res.data);
        if (res.data.success) return { success: 1, uid: res.data.uid }
        else return { success: 0 }
    }
}