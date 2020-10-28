import React, { useState, useCallback,useContext, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { MapComponent } from '../components/MapComponent'

export const MapsPage =() =>
{
    const {request,loading} = useHttp()
    const auth = useContext(AuthContext)
    const [mark,SetMark] = useState([])
    const [owner,Setowner] = useState([])
    const getMark = useCallback(async () => {
        try {
                 const fetched = await request('/api/maps/map','GET',null, {
                Authorization: `Bearer ${auth.token}`
            })
           await SetMark(fetched.marks)
           await Setowner(fetched.owner)
           console.log(fetched)
        } 
        catch (e) 
        {
            
        }
    },[auth,request])

     useEffect(()=>
     {
         getMark()
     },[getMark])
    
    if(loading)
    {
        console.log(auth)
        return <Loader/>
    }
    return(
        <>
        {!loading && mark && <MapComponent marks = {mark} owners = {owner} authId = {auth.userId}/>}
        </>
    )
}