import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/signup.css'

export default function Signup() {
    const ipcRenderer = window.ipcRenderer;

    const [user, setUSer] = useState({
        name: "",
        password: "",
        confirm_password: "",
        email: ""
    });

    async function handleSignup(event) {
        const req = await axios.post("http://127.0.0.1:5000/", user);
        console.log(req);
    }

    return (
        <div className='w-screen h-screen signup '>
            <div className='signup_1 bg-zinc-950'>
                <h1 className='text-white pt-4 font-bold text-center text-3xl pb-10'>Register</h1>
                <div>
                    <label className=' text-white text-md pl-[45px] font-thin'>Name</label><br />
                    <input className='rounded-3xl mt-1 mb-5 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[30px] w-3/4 ml-[40px]' type="text" onChange={(e) => setUSer({ ...user, name: e.target.value })} /><br />
                    <label className=' text-white text-md pl-[45px] font-thin'>E-mail Id</label><br />
                    <input className='rounded-3xl mt-1 mb-5 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[30px] w-3/4 ml-[40px]' type='email' onChange={(e) => setUSer({ ...user, email: e.target.value })} /><br />
                </div>
                <label className=' text-white text-md pl-[45px]  font-thin'>Password </label><br />
                <input className='rounded-3xl mt-1 mb-5 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[30px] w-3/4 ml-[40px]' type="text" onChange={(e) => setUSer({ ...user, password: e.target.value })} />
                <label className=' text-white text-md pl-[45px]  font-thin'>Confirm Password </label><br />
                <input className='rounded-3xl mt-1 mb-5 bg-zinc-700 border-white border-r-2 border-b-2 text-white h-[30px] w-3/4 ml-[40px]' type="text" onChange={(e) => setUSer({ ...user, confirm_password: e.target.value })} />
                <button className='ml-[100px] bg-rose-700 text-white text-center  mt-2 mb-1 h-10 w-28 font-bold rounded-[30px] border-white border-r-2 border-b-2' onClick={handleSignup}>Sign Up</button>
                <br></br>
                <p className='text-white font-thin text-center '>Already have an account ? <a className=" text-slate-300 underline" href='login' onClick={() => ipcRenderer.send('change_size', { height: 620, width: 500 })}>Login here</a></p>
                <button className='ml-[100px] translate-y-[-30px] text-white text-center mt-10 h-10 w-28 font-bold rounded-[30px] border-white border-r-2 border-b-2' >Close X</button>
            </div>
            <div className='signup_1 bg-rose-700'>
                {/* <h1>Hello</h1> */}
                <p className='text-white absolute right-[50px] text-4xl w-[200px] text-center mt-20'>Experiments made easy with</p>
                <img className="mt-4 mx-5 w-[270px] signup_img1" src="images/signup_img1.jpg" alt="" srcset="" />
                <img className="mt-2 mx-[300px] w-[270px] signup_img2" src="images/signup_img2.jpeg" alt="" srcset="" />
                <p className='text-white absolute pl-[20px] bottom-[100px] text-5xl font-bold w-[200px] text-center mt-20'>SMU KEITHLEY</p>
            </div>
        </div>
    )
}