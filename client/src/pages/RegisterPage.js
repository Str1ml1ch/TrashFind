import React, { useState, useEffect, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import 'materialize-css'
import {useHistory} from 'react-router-dom'
import NewNavbar from '../components/NewNavbar'
export const RegisterPage =() =>
{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading,request,error,clearError} = useHttp()
    const [form,setForm] = useState({
        email: '', password: '', name: '', surname: ''
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
            if(data)
            history.push('/login')
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
          <span className="card-title">Регистрация</span>
        </div>
        <div className="input-field">
            <input
            placeholder="Name"
            id="name"
            type="text"
            name="name"
            value = {form.name}
            onChange = {changeHandler}/>
            <label htmlFor="first_name">Name</label>
        </div>
        <div className="input-field">
            <input
            placeholder="Surname"
            id="surname"
            type="text"
            name="surname"
            value = {form.surname}
            onChange = {changeHandler}/>
            <label htmlFor="first_name">Surname</label>
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
          <button className="btn green darken-4" onClick ={registerHandler} disabled={loading}>Регистрация</button>
        </div>
      </div>
                </div>
        </div>
    )
}