import React ,{useContext}  from 'react'
import {BrowserRouter as Router} from 'react-router-dom' 
import { useRouts } from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Helmet } from 'react-helmet'
import {Loader} from './components/Loader'
import {AuthNavbar} from './components/AuthNavbar'
import NewNavbar from './components/NewNavbar'


function App(){
  const {token,login,logout,userId,ready} = useAuth()
  const isAunthenticated = !!token
  const routes = useRouts(isAunthenticated)

  if (!ready)
  {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token,login,logout,userId,isAunthenticated}}>
    <Router>
   <Helmet>
     <title>Find Trash</title>
   </Helmet>
      {isAunthenticated && <Navbar/>}
      {!isAunthenticated &&<AuthNavbar/>}
    <div>
        {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App
