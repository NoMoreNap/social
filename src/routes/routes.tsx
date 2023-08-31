import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Form } from '../screens/login/login'
import { Profile } from '../screens/profile/profile'
import { ProtectRoute } from './protect'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Form/>}/>
                <Route element={<ProtectRoute />}>
                    <Route path="/:id" element={<Profile/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
