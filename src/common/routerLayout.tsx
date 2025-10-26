// import React from 'react'
import { NavBar } from './Navbar'
import { Outlet } from 'react-router-dom'

export const RouterLayout = () => {
    return(
        <>
        <Outlet />
        <NavBar />
        </>
    )
}