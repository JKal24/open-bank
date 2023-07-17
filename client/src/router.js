import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login';
import Dashboard from './components/dashboard'
import Header from './components/header';
import Footer from './components/footer';

export default function AppRoutes() {

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" Component={Login}/>
                    <Route path="/dashboard" Component={Dashboard}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </>
    )
}