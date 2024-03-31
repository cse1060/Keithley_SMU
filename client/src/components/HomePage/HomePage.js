import React from 'react'
import {Watermark, Select , Space} from "antd";
import Landing from '../NavbarPage/Navbar';
import {Link} from 'react-router-dom';
import "./Homepage.css";
export default function HomePage() {
    const experiments = ["Experiment 1", "Experiment 2", "Experiment 3"];
    const instruments = ["Instrument 1", "Instrument 2", "Instrument 3"];
    const ports = ["Port 1", "Port 2", "Port 3"];
  return (
    <div>
      <Watermark content = {"Keithley SMU"} 
      font={{color:"black"}}>
        <div className="h-screen pt-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)'}}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-lg shadow-md" style={{ width: '600px', height: '400px'}}>
      
      <div className="grid grid-cols-1 gap-4 text-center justify-center items-center">
        <Select placeholder="Select Experiment" className='mt-6'
            style={{color:"black", width:550, textAlign:"center"}} options={experiments.map(exp=>{
                return{
                    label:`${exp}`,
                    value:exp
                }
            })}
            />
        <Select placeholder="SeLect Instrument" className="mt-6"
        style={{color:"black", width:550, textAlign:"center"}} options={instruments.map(ins=>{
            return{
                label:`${ins}`,
                value:ins
            }
        })}/>
        <Select placeholder="Select Port" className ="mt-6"
        style={{color:"black", width:550, textAlign:"center"}} options={ports.map(port=>{
            return{
                label:`${port}`,
                value:port
            }
        })}/>
        </div>
        <div className='justify-center items-center'>
          <Link to ="/graph">
        <button type="button" className="btn btn-outline-danger mt-6">Run Experiment</button></Link>
        </div>
    </div>
        </div>
      </Watermark>
    </div>
  )
}
