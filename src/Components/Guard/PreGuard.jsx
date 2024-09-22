import { useEffect,useState } from "react"
import firebaseAppConfig from "../../Utils/firebase-config"
import { getAuth,onAuthStateChanged } from "firebase/auth"
import { Navigate,Outlet } from "react-router-dom"
const auth=getAuth(firebaseAppConfig)
const preguard=()=>{
    const [session,setSession]=useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setSession(user)
            }
            else{
                setSession(false)
            }
            
        })
    },[])
   

    if(session===null)
        return(
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 ">
            <span className="relative flex w-6 h-6">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
             <span className="relative inline-flex h-6 rounded-full w-60 bg-sky-500"></span>
           </span>
      </div>
    )
    if(session)
        return <Navigate to="/"/>
   
    return <Outlet/>
}
export default preguard