import React from 'react'
import {MapComponent} from '../components/MapComponent'

export const MarksList = ({marks,auth}) =>{
    return (
        <div>
        <MapComponent marks = {marks} authId ={auth.owner}/>
        </div>
                
    )
}