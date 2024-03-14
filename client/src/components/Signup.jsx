import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Signup() {
    const [user, setUSer] = useState({
        username: "",
        password: ""
    });

    async function handleSignup(event) {
        const req = await axios.post("http://127.0.0.1:5000/", user);
        console.log(req);
    }

    return (
        <div className='w-screen h-screen bg-rose-700 overflow-hidden'>
            <div className='w-screen h-screen bg-zinc-950 translate-x-[-15px] translate-y-[-20px] rounded-2xl'>
                <h1 className='text-white pt-16 pb-16 font-bold text-center text-3xl translate-x-[15px]'>Welcome! to AutoKeithley</h1>
                <label className=' text-white pl-24 text-lg font-thin'>Enter your UserName </label><br />
                <input className='pl-4 translate-x-[15px] mx-[50px] rounded-3xl mt-6 mb-10 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[50px] w-[360px] ' type="text" onChange={(e) => setUSer({ ...user, username: e.target.value })} /><br />
                <label className=' text-white pl-24 text-lg font-thin'>Password :</label><br />
                <input className='pl-4 translate-x-[15px] mx-[50px] rounded-3xl mt-6 mb-10 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[50px] w-[360px] ' type="text" onChange={(e) => setUSer({ ...user, password: e.target.value })} />
                <button className=' bg-rose-700 text-white text-center ml-[190px] mt-10 mb-1 h-14 w-36 font-bold rounded-[30px] border-white border-r-2 border-b-2' onClick={handleSignup}>Sign Up</button>
                <button className=' translate-y-[-30px] text-white text-center ml-[190px] my-10 h-14 w-36 font-bold rounded-[30px] border-white border-r-2 border-b-2' >Close X</button>
            </div>
        </div>
    )
}