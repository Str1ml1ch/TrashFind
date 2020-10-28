import React, { useState,useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {GoogleMap,withScriptjs,withGoogleMap,Marker, InfoWindow} from 'react-google-maps'
import './MapsPage.css'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const MapComponent = ({marks,authId,owners}) =>
{
  const history = useHistory()
  const {request,loading} = useHttp()
  const [Position,SetPosition] = useState(null)
  const auth = useContext(AuthContext)
  const tooglebut = (panTo) =>
  {
    navigator.geolocation.getCurrentPosition(
      (position)=>
      {
        SetPosition(position)
        console.log(Position)
      }
    )
  }

 function  Map()
{
  const [SelectedMark,SetSelectedMark]  = useState(null)
  function check(selectowner, owner)
  {
    let email
    owner.map(e =>
      {
         if (selectowner == e._id)
         {
           return email = e.email
         }
      })
      return email
  }

  const deleteMark = async() => 
  {
    try {
      const fetched = await request('/api/maps/delete','POST',SelectedMark, {
     Authorization: `Bearer ${auth.token}`
 })
 console.log(fetched)
history.push('/create')
} 
catch (e) 
{
 
}
  }

  const doneMark = async() =>
  {
    try {
      const fetched = await request('/api/maps/update','POST',SelectedMark, {
     Authorization: `Bearer ${auth.token}`
 })
 history.push('/create')
} 
catch (e) 
{
 
}
  }



  function myowner(authId, SelectedMark)
  {
    if(SelectedMark.owner == authId)
    {
      return true
    }
  }


  function weekcheck(date)
  {
      let data = new Date(date)
      let datas = new Date()
      let result = (datas - data) / 86400 / 1000
      let disable = true
      if (result >= 7)
      {
        disable = false
      }
      console.log(result)
      return disable
  }


  function setDate(date)
  {
    let datas = new Date(date)
    let data = new Date()
    let  currentlydata = datas.getDate();
    if(currentlydata < 10)
    {
      currentlydata = '0' + currentlydata
    }

    let  currentmounth = datas.getMonth();
    if(currentmounth < 10)
    {
      currentmounth = currentmounth + 1
      currentmounth = '0' + currentmounth
    }
    let currenthours = datas.getHours()
    if(currenthours < 10)
    {
      currenthours = '0' + currenthours
    }

    let currentminutes = datas.getMinutes()
    if(currentminutes < 10)
    {
      currentminutes = '0' + currentminutes
    }
    
     return currentlydata+":" + currentmounth+":" + datas.getFullYear() + " " + currenthours + ":" + currentminutes
  }



if(!Position)
{
  return (
    <GoogleMap
    
    defaultZoom = {6}
    defaultCenter = {{lat:50.27,lng:30.3}}   
  > 
{marks.map(e=>(
  (!myowner(authId,e) ) ?
 e.status == true ? <Marker key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}  icon = {'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/> : <Marker key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }} 
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/> :
         e.status == true ?
      <Marker  icon = {'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'} key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}   
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/> : 
         <Marker  icon = {'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}   
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/>
)
)
   }

   {SelectedMark && (
   <InfoWindow position={{lat:SelectedMark.mapX, lng: SelectedMark.mapY}} style={{width:'200px'}}  onCloseClick={()=>{SetSelectedMark(null)}}>  
       <div className="infoClass">
         {console.log(SelectedMark.statu)}
         {SelectedMark.status == true &&<div>
         <h4 style={{color:'green'}}>{SelectedMark.city}</h4>
         </div> }
         {SelectedMark.status == false && 
         <div>
         <h4>{SelectedMark.city}</h4>
         </div> }
         <label className="emailLable">{check(SelectedMark.owner,owners)}</label><br/>
         <label className="emailLable">{setDate(SelectedMark.date)}</label><br/>
           <img src={SelectedMark.link} style={{width:'250px',maxHeight:'175px'}}></img> <br/>
        <label className="infoLable">{SelectedMark.describe}</label><br/>
        {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 green" title="Повторное уведомление органов!"
         disabled={weekcheck(SelectedMark.date)}><i class="material-icons">dialer_sip</i></a>}
          {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Удалить метку!" onClick={deleteMark} disabled={SelectedMark.status == true}
        ><i class="material-icons">close</i></a>}
         {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 green" title="Пометить как выполнено!" onClick={doneMark} disabled={SelectedMark.status == true}
         ><i class="material-icons">done</i></a>}
       </div>
     </InfoWindow>)}
     </GoogleMap> 
   ) 
 }
 else
 {
  return (
    <GoogleMap
    
    defaultZoom = {13}
    defaultCenter = {{lat:Position.coords.latitude,lng:Position.coords.longitude}}   
  > 
    <Marker key={Position.coords.latitude} title='Ваша геолокация' icon={'marker.png'}  position={{
          lat:Position.coords.latitude,
          lng:Position.coords.longitude,
        }}></Marker>
{marks.map(e=>(
  
  !myowner(authId,e) ?
  e.status == true ? <Marker key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}   icon = {'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/>: <Marker key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }} 
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/> :
       e.status == true ?  <Marker  icon = {'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'} key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}  
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/> :<Marker  icon = {'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'} key={e.owner} position={{
          lat:e.mapX,
          lng:e.mapY,
        }}  
         onClick={()=>{e.imagelink =new Image();SetSelectedMark(e);console.log(e)}}/>
)
)
   }

   {SelectedMark && (
   <InfoWindow position={{lat:SelectedMark.mapX, lng: SelectedMark.mapY}} style={{width:'200px'}}  onCloseClick={()=>{SetSelectedMark(null)}}>  
       <div className="infoClass">
         {SelectedMark.status == true &&<div>
         <h4 style={{color:'green'}}>{SelectedMark.city}</h4>
         </div> }
         {SelectedMark.status == false &&<div>
         <h4>{SelectedMark.city}</h4>
         </div> }
         <label className="emailLable">{check(SelectedMark.owner,owners)}</label><br/>
         <label className="emailLable">{setDate(SelectedMark.date)}</label><br/>
           <img src={SelectedMark.link} style={{width:'250px',maxHeight:'175px'}}></img> <br/>
        <label className="infoLable">{SelectedMark.describe}</label><br/>
        {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 green" title="Повторное уведомление органов!"
         disabled={weekcheck(SelectedMark.date)}><i class="material-icons">dialer_sip</i></a>}
         {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Удалить метку!" onClick={deleteMark} disabled={SelectedMark.status == true}
         ><i class="material-icons">close</i></a>}
         {myowner(authId,SelectedMark) &&  <a class="btn-floating btn-medium waves-effect waves-darken-4 green" title="Пометить как выполнено!" onClick={doneMark} disabled={SelectedMark.status == true}
         ><i class="material-icons">done</i></a>}
       </div>
     </InfoWindow>)}
     </GoogleMap> 
     
   ) 
 }


 

}
 const WrappedMap = withScriptjs(withGoogleMap(Map))
     return (
     <div>
     <div style = {{width: "100vw",height: "85vh",maxWidth:"100vw"}}>
     <WrappedMap
                 googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB36cRgNVXmRzXtPd2q3SZkkDdkIKOQm2M`}
                 loadingElement = {<div style={{height:"85vh"}}/>}
                 containerElement = {<div style={{height:"85vh"}}/>}
                 mapElement = {<div style={{height:"92vh"}} />}
                 
         />
         </div>
         {<a style={{left:'3%'}} class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Геолокация!"
        onClick={tooglebut}><i class="material-icons">explore</i></a>}
         </div>
     )
}
