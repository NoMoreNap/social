import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectType {
    redirectPath?: string
}

export const ProtectRoute = ({redirectPath = '/login' }: ProtectType): JSX.Element => {
    const isAllow = Boolean(localStorage.getItem('token'))
    console.log(isAllow)
    if (!isAllow) {
        return <Navigate to={redirectPath} replace={true}/>
    } else return <Outlet/>
}
