import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase from "firebase/compat/app";
import firebaseAppConfig from "../Utils/firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { set } from "firebase/database";
const auth = getAuth();

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [accountmenu, setAccountmenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        setSession(user);
      } else {
        setSession(false);
      }
    });
  }, []);
  console.log(session);
  const menus = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/Products",
    },
    {
      label: "Category",
      href: "/Category",
    },
    {
      label: "Contact US",
      href: "/Contact-us",
    },
  ];

  const mobileLink = (href) => {
    navigate(href);
    setOpen(false);
  };

  // loader
  if (session === null)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-100">
        <span className="relative flex w-6 h-6">
          <span className="absolute inline-flex w-full h-full opacity-75 animate-ping ro unded-full bg-sky-400"></span>
          <span className="relative inline-flex w-6 h-6 rounded-full bg-sky-500"></span>
        </span>
      </div>
    );
  return (
    <div>
      <nav className="sticky top-0 left-0 z-50 bg-white shadow-lg">
        <div className="flex justify-between w-10/12 mx-auto ">
          <img src="./images/logo2.jpg" className="w-[100px] " alt="" />
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <i className="text-3xl ri-menu-line"></i>
          </button>
          <ul className="items-center hidden gap-4 md:flex ">
            {menus.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="  block py-6 text-center hover:text-gray-200 hover:bg-orange-700 w-[100px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!session && (
              <>
                <Link
                  className="block py-6 text-center hover:text-gray-200 hover:bg-blue-400 w-[100px]"
                  to={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="block bg-indigo-600 py-3  text-center rounded text-lg font-semibold hover:text-gray-200 hover:bg-rose-400 text-white w-[100px]"
                  to={"/signup"}
                >
                  Signup
                </Link>
              </>
            )}

            {session && (
              <button
                className="relative"
                onClick={() => setAccountmenu(!accountmenu)}
              >
                <img
                  src="/images/avt.png"
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                {accountmenu && (
                  <div className=" flex flex-col gap-2 items-start w-[150px]  py-3  absolute top-12 shadow-xl right-0 bg-white  animate__animated animate__pulse">
                    <Link
                      to={"/profile"}
                      className="w-full px-3 py-2 text-left hover:bg-gray-200"
                    >
                      <i className="mr-2 ri-user-line"></i>
                      My Profile
                    </Link>

                    <Link
                      to={"/cart"}
                      className="w-full px-3 py-2 text-left hover:bg-gray-200"
                    >
                      <i className="mr-2 ri-shopping-cart-line"></i>
                      Cart
                    </Link>

                    <button
                      className="w-full px-3 py-2 text-left hover:bg-gray-200"
                      onClick={() => signOut(auth)}
                    >
                      <i className="mr-2 ri-logout-box-r-line"></i>
                      Logout
                    </button>
                  </div>
                )}
              </button>
            )}
          </ul>
        </div>
      </nav>
      <div>{children}</div>
      <footer className="py-16 bg-orange-600">
        <div className="grid w-10/12 gap-8 mx-auto md:gap-0 md:grid-cols-4">
          <div className="pr-8">
            <h1 className="mb-3 text-2xl font-semibold text-white ">
              Brand Details
            </h1>
            <p className="mb-6 text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              incidunt ex illo, inventore deserunctio maiores, amet soluta.
            </p>
            <img src="./images/logo2.jpg" className="w-[100px] " alt="" />
          </div>

          <div>
            <h1 className="mb-3 text-2xl font-semibold text-white">
              Website Links
            </h1>
            <ul className="space-y-4 text-slate-50">
              {menus.map((item, index) => (
                <li key={index}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                {" "}
                <Link to={"/signup"}>Signup</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-3 text-2xl font-semibold text-white">
              Follow us
            </h1>
            <ul className="space-y-4 text-slate-50">
              <li>
                <Link to={"/"}>Facebook</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"}>Youtube</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"}>Twitter</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"}>Linkdin</Link>
              </li>
              <li>
                {" "}
                <Link to={"/"}>Instagram</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-3 text-2xl font-semibold text-white">
              Contact us{" "}
            </h1>
            <form className="space-y-4">
              <input
                type="text"
                name="fullname"
                className="w-full p-3 bg-white rounded"
                placeholder="Your name"
                required
              />
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-white rounded"
                placeholder="Enter email id"
                required
              />
              <textarea
                required
                name="message"
                className="w-full bg-white rounded"
                placeholder="Message"
                rows={3}
              />
              <button className="p-3 px-6 text-white bg-black rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </footer>

      <aside
        className="fixed top-0 left-0 z-50 h-full overflow-hidden shadow-lg bg-slate-900 md:hidden"
        style={{
          width: open ? 290 : 0,
          transition: "0.3s",
        }}
      >
        <div className="flex flex-col gap-6 p-8">
            
          {session && (
            <button
              className="relative"
              onClick={() => setAccountmenu(!accountmenu)}
            >
                <div className="flex items-center gap-2">
                <img
                src="/images/avt.png"
                className="w-10 h-10 rounded-full"
                alt=""
                />
                <div>
                <p className="text-white capitalize">{session.displayName}</p>

                <p className="text-white">{session.email}</p>
                </div>
               
                </div>
           
              {accountmenu && (
                <div className=" flex flex-col gap-2 items-start w-[150px]  py-3  absolute top-12 shadow-xl right-0 bg-white  animate__animated animate__pulse">
                  <Link
                    to={"/profile"}
                    className="w-full px-3 py-2 text-left hover:bg-gray-200"
                  >
                    <i className="mr-2 ri-user-line"></i>
                    My Profile
                  </Link>

                  <Link
                    to={"/cart"}
                    className="w-full px-3 py-2 text-left hover:bg-gray-200"
                  >
                    <i className="mr-2 ri-shopping-cart-line"></i>
                    Cart
                  </Link>

                  <button
                    className="w-full px-3 py-2 text-left hover:bg-gray-200"
                    onClick={() => signOut(auth)}
                  >
                    <i className="mr-2 ri-logout-box-r-line"></i>
                    Logout
                  </button>
                </div>
              )}
            </button>
          )}
          {menus.map((item, index) => (
            <button
              onClick={() => mobileLink(item.href)}
              key={index}
              className="text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
};
export default Layout;

// import { useState ,useEffect} from "react"
// import { Link,useNavigate } from "react-router-dom"
// // import firebaseAppConfig from "../Util/firebase.config"
// // import { getAuth, onAuthStateChanged,signOut } from "firebase/auth"
// // const auth=getAuth(firebaseAppConfig)
// const Layout=({children})=>{
//     const[open,setOpen]=useState(false)
//     const[accountmenu, setAccountmenu]=useState(false)
//     const[session,setSession]=useState(null)
//     // const Navigate=useNavigate()
//     // useEffect(()=>{
//     //     onAuthStateChanged(auth,(user)=>{
//     //         if(user){
//     //             setSession(user)

//     //         }
//     //         else{
//     //             setSession(false)

//     //         }

//     //     })
//     // },[])
//     // console.log(session);
//     const menus=[

//             {
//                 label:"Home",
//                 href:'/'

//             },
//             {
//                 label:"Products",
//                 href:'/Products'

//             },
//             {
//                 label:"Category",
//                 href:'/Category'

//             },
//             {
//                 label:"Contact US",
//                 href:'/Contact-us'

//             },

//     ]
//     const mobilelink=(href)=>{
//         Navigate(href)
//         setOpen(href)

//     }
//   if(session===null)
//     return(
//         <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 ">
//               <span class="relative flex h-6 w-6">
//   <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
//   <span className="relative inline-flex w-6 h-6 rounded-full bg-sky-500"></span>
// </span>
//         </div>

//     )

//     return(

//         <div>
//          <nav className="sticky top-0 left-0 z-50 bg-white shadow-lg ">
//            <div className="flex items-center justify-between w-10/12 mx-auto">
//             <img src="/images/logonav.png" alt="" className="w-10" />
//             <button className="md:hidden">
//             <i className="text-3xl ri-menu-line" onClick={()=>setOpen(!open)}></i>
//             </button>
//             <ul className="items-center hidden gap-6 md:flex ">
//                 {
//                     menus.map((item,index)=>(
//                         <li key={index}>
//                             <button onClick={()=>mobilelink(item.href)} className="block py-6 hover:bg-rose-600 w-[100px] text-center hover:text-white">{item.label}</button>

//                         </li>

//                     ))
//                 }
//                 {
//                     !session &&
//                     <>
//                        <Link to="/login" className="block py-6 hover:bg-blue-600 w-[100px] text-center hover:text-white">Login</Link>
//                 <Link to="/signup" className="block px-8 py-3 font-semibold text-center text-white bg-blue-600 text-md hover:bg-rose-600 hover:text-white">Signup</Link>
//                     </>
//                 }
//                 {
//                     session &&
//                     <button className="relative" onClick={()=>setAccountmenu(!accountmenu)}>
//                         <img src={session.photoURL?session.photoURL:"/images/avt.png"} className="w-10 h-10 rounded-full"  />
//                         {
//                             accountmenu &&
//                             <div className=" flex flex-col  items-start animate__animated animate__fadeIn w-[150px] py-3 bg-white shadow-lg shadow-slate-500 absolute top-12 right-0">
//                                 <Link to="/profile" className="w-full px-3 py-2 text-left hover:bg-gray-100" >
//                                     <i className="mr-2 ri-user-line"></i>
//                                     My profile
//                                 </Link>
//                                 <Link to="/cart"  className="w-full px-3 py-2 text-left hover:bg-gray-100">
//                                     <i className="mr-2 ri-shopping-cart-line"></i>
//                                     cart
//                                 </Link>
//                                 <button  className="w-full px-3 py-2 text-left hover:bg-gray-100" onClick={()=>signOut(auth)}>
//                                     <i className="mr-2 ri-logout-circle-r-line"></i>
//                                     Logout
//                                     </button>

//                             </div>
//                         }
//                     </button>
//                 }

//             </ul>

//            </div>
//          </nav>
//          <div>
//             {children}
//          </div>

//          <footer  className="py-16 bg-orange-600">
//             <div className="grid w-10/12 gap-8 mx-auto md:gap-0 md:grid-cols-4">
//                 <div className="pr-8">
//                     <h1 className="mb-3 text-2xl font-semibold text-white">Brand details</h1>
//                 <p className="mb-6 text-gray-100">Lorem ipsum, dolor s cupiditate at modvoluptate sequi tempora expedita soluta?</p>
//                 <img src="/images/logonav.png" alt="" className="w-10" />

//                 </div>
//                 <div>
//                     <h1 className="mb-3 text-2xl font-semibold text-white">Website Links</h1>
//                <ul className="space-y-2 text-slate-50">
//                 {
//                     menus.map((item,index)=>(
//                         <li key={index}>
//                             <Link to={item.href}> {item.label}</Link>
//                         </li>

//                     ))
//                 }
//                 <li><Link to="/login">Login</Link></li>
//                 <li> <Link to="/signup">Signup</Link></li>

//                </ul>

//                 </div>
//                 <div>
//                     <h1 className="mb-3 text-2xl font-semibold text-white">Follow us</h1>
//                <ul className="space-y-2 text-slate-50">
//                 <li><Link to="/">Facebook</Link></li>
//                 <li> <Link to="/">Youtube</Link></li>
//                 <li> <Link to="/">Instagram</Link></li>
//                 <li> <Link to="/">Twitter</Link></li>

//                </ul>

//                 </div>
//                 <div>
//                     <h1 className="mb-3 text-2xl font-semibold text-white">Contact us</h1>
//               <form className="space-y-4">
//                 <input
//                 required
//                 name="fullname"
//                 className="w-full p-3 bg-white rounded"
//                 placeholder="your name"
//                  />
//                   <input
//                 required
//                 name="Email"
//                 className="w-full p-3 bg-white rounded"
//                 placeholder="Enter email id"
//                  />
//                  <textarea
//                  required
//                  name="message"
//                  className="w-full p-3 bg-white rounded"
//                  placeholder="message"
//                  rows={3}

//                  />
//                  <button className="px-6 py-3 text-white bg-black rounded hover:bg-gray-600">Submit</button>

//               </form>

//                 </div>

//             </div>

//          </footer>

//               <aside className="fixed top-0 left-0 z-50 h-full overflow-hidden shadow-lg md:hidden bg-slate-900"
//             style={{
//                 // width:(open?250:0),
//                 width:open?250:0,
//                 transition:"0.3s"
//             }}
//             >
//             <div className="flex flex-col gap-6 p-8">
//             {
//                     session &&
//                     <button className="relative" onClick={()=>setAccountmenu(!accountmenu)}>
//                         <div className="flex items-center gap-3">
//                         <img src={session.photoURL?session.photoURL:"/images/avt.png"} className="w-10 h-10 rounded-full"  />
//                         <div>
//                         <p className="text-left text-white capitalize">{session.displayName}</p>
//                         <p className="text-white">{session.email}</p>
//                         </div>

//                         </div>

//                         {
//                             accountmenu &&
//                             <div className=" flex flex-col  items-start animate__animated animate__fadeIn w-[150px] py-3 bg-white shadow-lg shadow-slate-500 absolute top-12 right-0">
//                                 <Link to="/profile" className="w-full px-3 py-2 text-left hover:bg-gray-100" >
//                                     <i className="mr-2 ri-user-line"></i>
//                                     My profile
//                                 </Link>
//                                 <Link to="/cart"  className="w-full px-3 py-2 text-left hover:bg-gray-100">
//                                     <i className="mr-2 ri-shopping-cart-line"></i>
//                                     cart
//                                 </Link>
//                                 <button  className="w-full px-3 py-2 text-left hover:bg-gray-100" onClick={()=>signOut(auth)}>
//                                     <i className="mr-2 ri-logout-circle-r-line"></i>
//                                     Logout
//                                     </button>

//                             </div>
//                         }
//                     </button>
//                 }

//                 {
//                     menus.map((item,index)=>(
//                         <Link to={item.href} key={index} className="text-white">
//                         {item.label}
//                         </Link>
//                     ))
//                 }
//             </div>
//             </aside>

//         </div>
//     )
// }
// export default Layout
