import React, { useContext } from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Redirecting = () =>
{
    const history = useHistory()
    const auth = useContext(AuthContext)
        history.push('/login')

    return(
<div></div>
    )
}