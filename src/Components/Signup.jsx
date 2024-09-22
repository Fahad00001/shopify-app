import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import firebaseAppConfig from "../Utils/firebase-config";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { set } from "firebase/database";
const auth = getAuth(firebaseAppConfig);

const Signup = () => {
    const navigate=useNavigate()
  const [passwordType, setPasswordType] = useState("password");
  const [formvalue, setFormValue] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error,setError]=useState(null)
  
  const[loader,setLoader]=useState(false)

  const signup = async (e) => {
    try {
      e.preventDefault();
      setLoader(true)
     await createUserWithEmailAndPassword(
        auth,
        formvalue.email,
        formvalue.password
      );
      await updateProfile(auth.currentUser,{displayName:formvalue.fullname})
      navigate('/')
    } 
    
    catch (err) {
      setError(err.message);
    }
    finally{
        setLoader(false)
    }
  };
  const handleOnChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormValue({
      ...formvalue,
      [name]: value,
    });
    setError(null)
  };
  return (
    <div className="grid md:h-screen md:grid-cols-2 animate__animated animate__fadeIn md:overflow-hidden">
      <img
        src="/images/signup.jpg"
        className="object-contain w-full h-64 md:h-full"
      />
      <div className="flex flex-col p-8 md:p-16">
        <h1 className="text-4xl font-bold">New user</h1>
        <p className="text-lg text-gray-600 ">
          Create your account to start shopping
        </p>
        <form className="mt-8 space-y-6" onSubmit={signup}>
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Fullname</label>
            <input
              onChange={handleOnChange}
              required
              name="fullname"
              placeholder="fahad iqbal"
              className="p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Email id</label>
            <input
              onChange={handleOnChange}
              required
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="relative flex flex-col">
            <label className="mb-1 text-lg font-semibold">Passsword</label>
            <input
                 onChange={handleOnChange}
              name="password"
              type={passwordType}
              placeholder="**********"
              className="p-3 border border-gray-300 rounded"
            />
            <button
              onClick={() =>
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                )
              }
              type="button"
              className="absolute w-8 h-8 rounded-full right-4 top-10 hover:bg-blue-200 hover:text-blue-300"
            >
              {passwordType === "password" ? (
                <i className="ri-eye-line"></i>
              ) : (
                <i className="ri-eye-off-line"></i>
              )}
            </button>
          </div>

          {
            loader ?
            <h1 className="text-lg text-gray-600 fonty-semibold">Loading...</h1>
            :
            <button className="px-8 py-2 text-white bg-blue-600 rounded px-18 font-semiblod hover:bg-slate-500">
            Signup
          </button>
            

          }

          {/* <h1 className="text-lg text-gray-600 fonty-semibold">Loading...</h1> */}

    
        </form>
        <div className="mt-2">
          Already have an account ?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Signin
          </Link>
        </div>
        
       {  
          error &&
         <div className= "flex justify-between p-3 mt-2 font-semibold text-white rounded shadow flep-3 bg-rose-600 animate__animated animate__pulse">
         <p>{error}</p>
         <button onClick={()=>setError(null)} className="text-2xl"><i class="ri-close-circle-line"></i></button>
         </div>
       }
        
    
      </div>
    </div>
  );
};
export default Signup;
