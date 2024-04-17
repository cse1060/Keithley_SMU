import React, { useEffect, useState } from 'react'

export default function GetUser(props) {

    const session = window.session
    useEffect(() => {
        session.uid((event, args) => {
            console.log(args);
            props.setUser(args.uid)
        })
    }, [session])

    useEffect(() => {
        window.ipcRenderer.send('isUserLogin', {})
    })

    return (<></>)
}
