
import { useState,useEffect } from "react";
import Layout from "./Layout"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation ,Pagination} from 'swiper/modules';
import firebaseAppConfig from "../Utils/firebase-config";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { getFirestore,addDoc,collection,getDocs } from "firebase/firestore";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swal from "sweetalert2";
import axios from "axios";

const db=getFirestore(firebaseAppConfig)
const auth=getAuth(firebaseAppConfig)

const Home= ()=>{
  const [products,setProducts]=useState([ ])
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
  const req=async()=>{
   const snapshot= await getDocs(collection(db,"products"))
   const tmp=[]
   snapshot.forEach((doc)=>{
    const allproducts=doc.data()
    allproducts.id=doc.id
    tmp.push(allproducts)
   })
   setProducts(tmp)
  }
  req();
 },[])
 console.log(session);

  const addtocart=async(item)=>{
    try{
      item.userId=session.uid
      await addDoc(collection(db,"carts"),item)
      new Swal({
        icon:'Success',
        title:'Product added'
        
      })
    }
    catch(err){
      new Swal({
        icon:'error',
        title:'Failed !',
        text:err.message
      })
    }
  }

  const buynow=async(price)=>{
    try{
      const res=await axios.post('http://localhost:8080/order')
      console.log(res);
      
    }
    catch(err){
      console.log(err);
        
    }
  }

 
  
    return(
        <Layout>
             <div>
           <header>
           <Swiper
           className="z-[-1]"
           navigation={true}
           modules={[Navigation,Pagination]} 
           pagination={true}
    //   spaceBetween={50}
      slidesPerView={1}
     
    >
      <SwiperSlide>
        <img src="/images/c1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/c2.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/c3.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/c4.jpg" alt="" />
      </SwiperSlide>
    </Swiper>
           </header>
           <div className="p-8 md:p-16">
            <h1 className="text-3xl font-bold text-center">Latest Products</h1>
            <p className="mx-auto mt-2 mb-6 text-center text-gray-600 md:w-7/12 text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate dolorem sit aliquam odit eius iste nam laudantium aspernatur molestiae quisquam?</p>
            <div className="grid gap-10 p-8 mx-auto md:w-10/12 md:grid-cols-4 ">
              {
                products.map((item,index)=>(
                  <div key={index} className="bg-white border shadow-lg ">
                    <img src={item.image?item.image:'/images/website avt.jpg'} />
                    <div className="p-4">
                      <h1 className="text-lg font-semibold">{item.title}</h1>
                      <div className="space-x-2">
                        <label className="text-lg font-bold"> ₹{item.price-(item.price*item.discount)/100}</label>
                        <del> ₹{item.price}</del>
                        <label className="text-gray-600">({item.discount}%)</label>
                        
                      </div>
                      <button className="w-full py-2 mt-4 font-semibold text-white bg-green-600 rounded hover:bg-gray-500" onClick={()=>buynow(item.price-(item.price*item.discount)/100)}>Buy Now</button>
                      <button onClick={()=>addtocart(item)} className="w-full py-2 mt-2 font-semibold text-white bg-orange-600 rounded hover:bg-rose-500">
                      <i className="mr-2 ri-shopping-cart-line"></i>
                        Add to Cart
                        </button>
                      
                      
                    </div>
                    
                  </div>
                ))
              }
            </div>
           </div>
        </div>
        </Layout>
       
    )
}
export default Home

// key id-rzp_test_bUog2IecCBBSv4
//  secret key-sHeCHhvScX2OVFppsK1m5bqW onClick
// another key
// rzp_test_bWj9LrtMug7Pdd
// Aw9DRjszKSz5wgfF3q0pGuEX