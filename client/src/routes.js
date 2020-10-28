import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MapsPage } from './pages/MapsPage'
import { CreatePage } from './pages/CreatePage'
import { AuthPage } from './pages/AuthPage'
import {RegisterPage} from './pages/RegisterPage'

export const useRouts = isAutenthicated =>
{
    if(isAutenthicated)
    {
        return(
            <Switch>
                <Route path="/map" component={MapsPage} exact />
                <Route path="/create" component={CreatePage} exact />
                <Redirect to="create"/>
            </Switch>
        )
    }

    return(
        <Switch>
                <Route path="/login" component={AuthPage} exact />
                <Route path="/register" component={RegisterPage} exact />
                <Route path="/" exact>
                <Redirect to = "/login"></Redirect>
                </Route>
        </Switch>
    )

}