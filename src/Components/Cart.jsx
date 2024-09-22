import { useState,useEffect} from "react"
import Layout from "./Layout"
import firebaseAppConfig from "../Utils/firebase-config";
import { onAuthStateChanged,getAuth } from "firebase/auth";

import { getFirestore,getDocs,collection,where,query, doc } from "firebase/firestore";
const auth=getAuth(firebaseAppConfig)
const db=getFirestore(firebaseAppConfig)
const Cart=()=>{
    const[ product,SetProduct]=useState([ ])
    const[session,setSession]=useState(null)
    useEffect(()=>{
     onAuthStateChanged( auth,(user)=>{
       if(user){
         setSession(user)
       }
       else{
         setSession(null)
       }
       
     })
    },[])
    
    useEffect(()=>{
        const req=async ()=>{
            if(session){
                const col=collection(db,"carts")  
                const q=query(col,where("userId","==",session.uid))
                 const snapshot=await getDocs(q)
                 const tmp=[]
                 snapshot.forEach((doc)=>{
                    const document=doc.data()
                    // console.log(document);
                    tmp.push(document)
                 })
                 SetProduct(tmp)
              }  
        }
        req()
      
    },[session])
    return(
        <Layout>
          <div className="p-8 mx-auto bg-white border rounded-md shadow-lg md:my-16 md:w-7/12">     
          <div className="flex items-center gap-4">
            <i className="text-4xl ri-shopping-cart-line"></i>
          <h1 className="text-3xl font-semibold ">Cart</h1>
          </div>
          <hr className="my-6"/>
          <div className="space-y-12">
            {
                product.map((item,index)=>(
                    <div key={index}>
                        <img src={item.image} className="w-[100px] border border-3 shadow" />
                        <div>
                        <h1 className="text-lg font-semibold capitalize">{item.title}</h1>
                        <div className="flex flex-col gap-4 ">
                            <div className="space-x-3">
                            <label className="text-lg font-semibold">₹ {item.price-(item.price*item.discount)/100}</label>
                            <del>₹ {item.price}</del>
                            <label className="text-gray-500">{item.discount}% Discount</label>
                            </div>
                          
                            <button className="px-4 py-2 text-white rounded bg-rose-600 w-fit">
                                <i className="mr-2 ri-delete-bin-line"></i>
                                Remove
                            </button>
                        </div>
                        </div>
                        
                    </div>
                    
                    

                ))
            }
          </div>
          <hr className="my-6"/>
          <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Total :₹ 10,000</h1>
          <button className="px-12 py-2 mt-4 font-semibold text-white bg-green-500 rounded hover:bg-rose-600">
           <i className="mr-2 ri-shopping-bag-4-line"></i>
          Buy now
         </button>
          </div>
       
          
        </div>
        </Layout>
      
    )
}
export default Cart