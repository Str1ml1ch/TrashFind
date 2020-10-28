import React, { useContext } from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () =>
{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logootHandler = event =>
    {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">Trash check</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Добавить свалку</NavLink></li>
            <li><NavLink to="/map">Просмотр свалок</NavLink></li>
            <li><a href='/' onClick={logootHandler} style={{background:'black'}}>Logout</a></li>
          </ul>
        </div>
      </nav>
      
    )
}