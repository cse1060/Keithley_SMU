import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context'
import GetUser from '../middleware/getUser'
import { Card, Dropdown, Navbar } from "flowbite-react";
import Navbar_func from './NavbarPage/Navbar';
import axios from "axios"

export default function Profile() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})

    useEffect(() => {
        console.log(user);
        if (!user) {
            return
        }
        getDetails();
    }, [user])

    async function getDetails() {
        const res = await axios.post("http://localhost:8000/profile_details", { uid: user })
        console.log(res.data);
        setData(res.data.doc)
        setLoading(false);
    }
    if (loading) {
        return (
            <>
                <GetUser setUser={setUser} />
                <>Loading</>
            </>
        )
    }
    return (
        <div>
            <Navbar_func />
            <Card className="w-full">
                <div className="flex justify-end px-4 pt-4">
                    <Dropdown inline label="">
                        <Dropdown.Item>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Edit
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Export Data
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Delete
                            </a>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img
                        alt="Bonnie image"
                        height="96"
                        src='https://th.bing.com/th/id/OIP.tGpxDQ9kMbteulczVw3oeQHaEo?w=273&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                        width="96"
                        className="mb-3 rounded-full shadow-lg"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.username}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Physicsist</span>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p className='font-bold'>Name</p>
                        <p className='font-bold'>Email</p>
                        <p className='font-bold'>Experiments Performed</p>
                    </div>
                    <div>
                        <p>{data.displayName}</p>
                        <p>{data.email}</p>
                        <p>{data.experiments.length}</p>
                    </div>
                </div>
            </Card>
            <Card className="width-full">
                <h5 className="text-xl text-center font-bold text-gray-900 dark:text-white">Experiments</h5>

                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <div className="flex justify-between ">
                                <div className="">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">abc</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">2024-4-8</p>
                                </div>
                                <p className="inline-flex items-center truncate text-sm text-gray-500 dark:text-gray-400 ">UV Light</p>
                                <a className=" inline-flex  items-center hover:text-sky-700 text-base font-semibold text-gray-900 dark:text-white" href="#">View</a>
                            </div>
                        </li>
                        {
                            data.experiments.map((exp, id) => {
                                return (
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="shrink-0">
                                                <img
                                                    alt="Neil image"
                                                    height="32"
                                                    src="/images/people/profile-picture-1.jpg"
                                                    width="32"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{ }</p>
                                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">email@windster.com</p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </Card>
        </div>
    )
}
