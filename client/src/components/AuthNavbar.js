import React, { useContext,Component } from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import $ from 'jquery'

export const AuthNavbar = (props) =>
{
  console.group('props')
  console.log(props)
  console.groupEnd()
 function menuClick(){
    this.refs.ClickItem.slideToggle(500)
  }
    return(
        <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">Trash check</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </ul>
        </div>
      </nav>
    )
}