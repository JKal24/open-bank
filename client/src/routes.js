import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router'
import Login from './components/login';
import Dashboard from './components/dashboard'

export default function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" Component={Login}/>
                <Route path="/dashboard" Component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    )
}