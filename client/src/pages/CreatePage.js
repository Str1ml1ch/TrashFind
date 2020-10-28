import React, {useState,useEffect, useContext} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import {GoogleMap,withScriptjs,withGoogleMap,Marker} from 'react-google-maps'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import { Loader } from '../components/Loader'

let formLn = 0

export const CreatePage =() =>
{
  const [Position,SetPosition] = useState(null)

  const tooglebut = (panTo) =>
  {
    navigator.geolocation.getCurrentPosition(
      (position)=>
      {
        SetPosition(position)
        SetMark(null)
        console.log(position)
      }
    )
  }

  const history = useHistory()
  
  const [mark,SetMark] = useState(null)

if(mark)
console.log(mark)

function Map()
{

if (!Position)
{

if(!mark)
{
  return (
     <GoogleMap
    onClick = {(e)=>{form.coordsX = e.latLng.lat(); form.coordsY= e.latLng.lng(); SetMark(e.latLng); console.log(form)}}
    defaultZoom = {6} loadingElement = {<Loader/>}
    defaultCenter = {{lat:50.27,lng:30.3}} 
  >
                 {<a style={{left:'90%'}} class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Повторное уведомление органов!"
        onClick={tooglebut}><i class="material-icons">explore</i></a>}

      {mark && (
       <Marker position={{
        lat:Number(mark.lat()),
        lng:Number(mark.lng()),
      }}   >
      </Marker>
    )}
    </GoogleMap>
  )
    }
    else
    {
      return (
        <GoogleMap
       onClick = {(e)=>{form.coordsX = e.latLng.lat(); form.coordsY= e.latLng.lng(); SetMark(e.latLng); formLn = formLn+1}}
       defaultZoom = {6} loadingElement = {<Loader/>}
       defaultCenter = {{lat:form.coordsX,lng:form.coordsY}} 
     >
        {<a style={{left:'90%'}} class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Геолокация!"
        onClick={tooglebut}><i class="material-icons">explore</i></a>}
         {mark && (
          <Marker position={{
           lat:Number(mark.lat()),
           lng:Number(mark.lng()),
         }}   >
         </Marker>
       )}
       </GoogleMap>
     )
    }

}
else
{
  if(!mark)
{
  form.coordsX = Position.coords.latitude; form.coordsY= Position.coords.longitude;
  return (
    
     <GoogleMap
    onClick = {(e)=>{ SetMark(e.latLng);form.coordsX = e.latLng.lat(); form.coordsY=  form.coordsY= e.latLng.lng();  console.log(form)}}
    defaultZoom = {6} loadingElement = {<Loader/>}
    defaultCenter = {{lat:Position.coords.latitude,lng:Position.coords.longitude}} 
  >
                 {<a style={{left:'90%'}} class="btn-floating btn-medium waves-effect waves-darken-4 red" title="Геолокация!"
        onClick={tooglebut}><i class="material-icons">explore</i></a>}

       <Marker position={{
        lat:Position.coords.latitude,
        lng:Position.coords.longitude,
      }}>
      </Marker>
    
    </GoogleMap>
  )
    }
    else
    {
      return (
        <GoogleMap
       onClick = {(e)=>{form.coordsX = e.latLng.lat(); form.coordsY= e.latLng.lng(); SetMark(e.latLng); formLn = formLn+1}}
       defaultZoom = {6} loadingElement = {<Loader/>}
       defaultCenter = {{lat:form.coordsX,lng:form.coordsY}} 
     >
        {<a style={{left:'90%'}} class="btn-floating btn-medium waves-effect waves-darken-4 red" title="геолокация!"
        onClick={tooglebut}><i class="material-icons">explore</i></a>}
         {mark && (
          <Marker position={{
           lat:Number(mark.lat()),
           lng:Number(mark.lng()),
         }}   >
         </Marker>
         )}
       </GoogleMap>
     )
    }
}
}


const WrappedMap = withScriptjs(withGoogleMap(Map))
  const auth = useContext(AuthContext)
  const message = useMessage()
    const {loading,request,error,clearError} = useHttp()
  const [form,setForm] = useState({
    coordsX: '', coordsY: '', city:'',link:'',describe:''
})
console.log(form)
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


    const SendData = async event =>
    {
      try
      {
      const data =  await request('/api/maps/create','POST',{...form}, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push('/map')
      }
      catch(e)
      {

      }
    }
    return(
      <div style={{maxWidth:"99"}}>
        <div>
        <div style = {{width: "99vw",height: "60vh",maxWidth:"99"}}>
        <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB36cRgNVXmRzXtPd2q3SZkkDdkIKOQm2M`}
                    loadingElement = {<div style={{height:"200px"}}/>}
                    containerElement = {<div style={{height:"200px"}}/>}
                    mapElement = {<div style={{height:"60vh"}} />}
            />
            </div>
            </div>
            <div>
            <div className="input-field" style={{display:'none'}}>
            <input
            placeholder="координата Х"
            id="coordsX"
            type="number"
            name="coordsX"
            onChange = {changeHandler}
            autoComplete="off"/>
            <label htmlFor="first_name">координата Х</label>
        </div>
        <div className="input-field" style={{display:'none'}}>
            <input
            placeholder="координата Y"
            id="coordsY"
            type="number"
            name="coordsY"
            onChange = {changeHandler}
            autoComplete="off"/>
            <label htmlFor="first_name">координата Y</label>
        </div>
          <div className = "row">
          <div className='row'>
          <div className="input-field col s6"> 
          <input placeholder="Город" id="city" type="text" onChange = {changeHandler} name="city" className="validate"></input>
          <label for="first_name">Название Города</label>
          </div>
          </div>
          <div className='row'>
          <div className="input-field col s6"> 
          <input placeholder="Ссылка" id="link" name="link" onChange = {changeHandler} type="text" className="validate"></input>
          <label for="first_name">Cсылка на изображение <a href="https://ru.imgbb.com/">https://ru.imgbb.com/</a></label>
          </div>
          </div>
          </div>
          <div className="row">
          <div className="input-field col s6">
            <textarea id="describe" name="describe" onChange = {changeHandler} class="materialize-textarea"  data-length="120"></textarea>
            <label for="textarea2">Описание</label>
          </div>
        </div>
          <div className="card-action">
          <button className="btn waves-effect waves-light" style={{marginRight: 10}} onClick={SendData}>Добавить</button>
          </div>        
          </div>
            </div>
    )
}