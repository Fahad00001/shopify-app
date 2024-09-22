import { useState } from "react"
import firebaseAppConfig from "../Utils/firebase-config"
import { getAuth,signInWithEmailAndPassword } from "firebase/auth"
import { Link ,useNavigate} from "react-router-dom"
// import { set } from "firebase/database"
const auth=getAuth(firebaseAppConfig)

const Login=()=>{
    const navigate=useNavigate()
    const [passwordType,setPasswordType]= useState("password")
    const [error,setError]=useState(null)
    const[loader,setLoader]=useState(false)
    const[formvalue,setFormValue]=useState({
        email:'',
        password:''
    })


    const login=async(e)=>{
        try{
            e.preventDefault();
            setLoader(true)
            // console.log(formvalue);
           await signInWithEmailAndPassword(auth,formvalue.email,formvalue.password)
           navigate('/')
            
        }
        catch(err){
          setError("Invalid credential provided")
            
        }
        finally{
            setLoader(false)
        }
     
    }

    
   
       
    const handleonChange=(e)=>{
        const input=e.target
        const name=input.name
        const value=input.value
        setFormValue({
            ...formvalue,
            [name]:value
        })
        setError(null)
    }
    
    return(
        <div className="grid md:h-screen md:overflow-auto md:grid-cols-2 animate__animated animate__fadeIn"> 
           <img src="/images/signup.jpg" className="object-cover w-full h-26 md:h-full" />
           <div className="flex flex-col p-8 md:p-16">
            <h1 className="text-4xl font-bold">Signin</h1>
            <p className="text-lg text-gray-600 ">Enter profile deatils to login</p>
            <form className="mt-8 space-y-6" onSubmit={login}>
                
                <div className="flex flex-col">
                    <label className="mb-1 text-lg font-semibold">Email id</label>
                    <input
                    onChange={handleonChange}
                    required
                    name="email"
                    placeholder="example@gmail.com"
                    className="p-3 border border-gray-300 rounded"
                    
                    />
                </div>
                <div className="relative flex flex-col">
                    <label className="mb-1 text-lg font-semibold">Passsword</label>
                    <input
                    onChange={handleonChange}
                    name="password"
                    type={passwordType}
                    placeholder="**********"
                    className="p-3 border border-gray-300 rounded"
                    
                    />
                    <button onClick={()=>setPasswordType(passwordType==="password" ? "text" : "password")}  type="button" className="absolute w-8 h-8 rounded-full right-4 top-10 hover:bg-blue-200 hover:text-blue-300">
                        {
                            passwordType==="password" ?
                            <i className="ri-eye-line"></i>
                            :
                            <i className="ri-eye-off-line"></i>
                        }
                   
                    </button>
                </div>
                {
                    loader ?
                    <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
                    :
                    <button className="p-3 px-8 py-3 text-white bg-blue-600 rounded font-semiblod hover:bg-slate-500">Login</button>
                }
             
            </form>
            <div className="mt-2">
                Don`t have an account ? <Link to="/signup" className="font-semibold text-blue-600">Register Now</Link> 
            </div>
            {
                error &&
                <div className="flex items-center justify-between p-3 mt-2 font-semibold text-white rounded shadow bg-rose-600 animate__animated animate-pulse">
                <p>{error}</p>
                <button onClick={()=>setError(null)}>
                <i className="ri-close-circle-line"></i>
                </button>
                </div>
                
            }
           </div>
        </div>
    )
}
export default Login