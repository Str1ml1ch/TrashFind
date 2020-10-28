import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import 'materialize-css'

export const AuthPage =() =>
{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request,error,clearError} = useHttp()
    const [form,setForm] = useState({
        email: '', password: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    },[error,message,clearError])

    useEffect(()=>
    {
        window.M.updateTextFields()
    },[])


    const changeHandler = event =>
    {
        setForm({...form,[event.target.name]: event.target.value})
    }

    const registerHandler = async() =>
    {
        try
        {
            const data = await request('/api/auth/register','POST',{...form})
            console.log('Data:', data)
        }
        catch(e)
        {

        }
    }

    const loginHandler = async() =>
    {
        try
        {
            const data = await request('/api/auth/login','POST',{...form})
            auth.login(data.token,data.userId)
        }
        catch(e)
        {

        }
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="MainText">Карта мусора</h1>
                <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
        </div>
        <div className="input-field">
            <input
            placeholder="Введите Email"
            id="email"
            type="text"
            name="email"
            autoComplete="off"
            value = {form.e}
            onChange = {changeHandler}/>
            <label htmlFor="first_name">Email</label>
        </div>
        <div className="input-field">
            <input
            placeholder="Введите Пароль"
            id="password"
            type="password"
            name="password"
            value = {form.password}
            onChange = {changeHandler}/>
            <label htmlFor="first_name">Password</label>
        </div>
        <div className="card-action">
          <button className="btn blue darken-4" style={{marginRight: 10}}  disabled={loading} onClick ={loginHandler}>Вход</button>
        </div>
      </div>
                </div>
        </div>
    )
}