import React from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import {ResponsiveContainer, LineChart,Line,XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import Header from '../Header/Header';
import './graph.css'
const pdata = [
    { name: "Math", numberOfStudents: 30, fees: 100 },
    { name: "Science", numberOfStudents: 25, fees: 120 },
    { name: "History", numberOfStudents: 20, fees: 90 },
    { name: "English", numberOfStudents: 35, fees: 110 },
    { name: "Computer Science", numberOfStudents: 28, fees: 130 },
    { name: "Art", numberOfStudents: 15, fees: 80 }
  ];
  
const graph = () => {
    
  return (
   <><Header/><div className='yo'> <ResponsiveContainer width = {1300} height={500} aspect = {3}>
    <LineChart data={pdata}>
        <CartesianGrid stroke='#ccc' strokeDasharray="3 3"/>
        <XAxis dataKey="name" interval='preserveStartEnd'/><YAxis/>
        <Line type="monotone" dataKey="fees" activeDot={{ r: 8 }}/>
        <Tooltip position="cursor"/>
    </LineChart>
    </ResponsiveContainer></div></>
    
  )
}

export default graph