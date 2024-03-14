import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Get_devices() {

    const [devices, setDevices] = useState([])
    const [connectedDevice, setConnectedDevice] = useState(null)

    const viewDevices = async () => {
        const res = await axios.get("http://127.0.0.1:5000/view_devices");
        const dev = res.data;
        if (res.data.success) {
            setDevices(res.data.devices)
        }
    }

    const connect_device = async (device) => {
        console.log(device);
        // const res = await axios.post("http://127.0.0.1:5000/connect_device", { connect: device });
        // if (res.data.success) {
        //     setConnectedDevice(device)
        // }
    }

    return (
        <div>
            <button onClick={viewDevices}>
                View Available Devices
            </button>
            {
                devices.map((device, idx) => {
                    return (
                        <p onClick={async () => {
                            const res = await axios.post("http://127.0.0.1:5000/connect_device", { connect: device });
                            if (res.data.success) {
                                setConnectedDevice(device)
                            }
                        }}>
                            {device}
                        </p>
                    )
                })
            }
            {connectedDevice && <h1>{connectedDevice}</h1>}
        </div>
    )
}
