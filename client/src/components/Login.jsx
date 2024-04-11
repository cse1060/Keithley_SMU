import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import verify_user from '../middleware/verify_user';

export default function Login() {

    const ipcRenderer = window.ipcRenderer;

    const navigate = useNavigate();

    const [user, setUSer] = useState({
        email: "",
        password: ""
    });

    async function handleSignup(event) {
        var req
        try {
            req = await axios.post("http://localhost:8000/signin", user);
            console.log(req.data);
        } catch (error) {
            console.log(error);
        }
        console.log(req.CustomToken);
        if (req.data.CustomToken) {
            await axios.post("http://127.0.0.1:5000/loginToken", { token: req.data.CustomToken })
            navigate("/")
        }
    }

    return (
        <div className='w-screen h-screen bg-rose-700 overflow-hidden'>
            <div className='w-screen h-screen bg-zinc-950 translate-x-[-15px] translate-y-[-20px] rounded-2xl'>
                <h1 className='text-white pt-16 pb-16 font-bold text-center text-3xl translate-x-[15px]'>Welcome! to AutoKeithley</h1>
                <label className=' text-white pl-24 text-lg font-thin'>Enter your UserName </label><br />
                <input className='pl-4 translate-x-[15px] mx-[50px] rounded-3xl mt-6 mb-10 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[50px] w-[360px] ' type="text" onChange={(e) => setUSer({ ...user, email: e.target.value })} /><br />
                <label className=' text-white pl-24 text-lg font-thin'>Password :</label><br />
                <input className='pl-4 translate-x-[15px] mx-[50px] rounded-3xl mt-6 mb-10 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[50px] w-[360px] ' type="text" onChange={(e) => setUSer({ ...user, password: e.target.value })} />
                <button className=' bg-rose-700 text-white text-center ml-[190px] mt-2 mb-1 h-14 w-36 font-bold rounded-[30px] border-white border-r-2 border-b-2' onClick={() => { handleSignup() }}>Log In</button>
                <p className='text-white font-thin text-center translate-x-[15px]'>Don't have an account ? <a className=" text-slate-300 underline" href='signup' onClick={() => ipcRenderer.send('change_size', { height: 600, width: 900 })}>Register here</a></p>
                <button className=' translate-y-[-30px] text-white text-center ml-[190px] my-10 h-14 w-36 font-bold rounded-[30px] border-white border-r-2 border-b-2' >Close X</button>
            </div>
        </div>
    )
}