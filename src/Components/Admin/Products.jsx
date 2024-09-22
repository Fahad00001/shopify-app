import { useState,useEffect} from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../../Utils/firebase-config";
import { getFirestore,addDoc,collection ,getDocs,updateDoc,doc} from "firebase/firestore";
import Swal from "sweetalert2";
import { set } from "firebase/database";
import Uploadfile from "../../Utils/Storage";
const db=getFirestore(firebaseAppConfig)
const Product = () => {
    const[updateui,setupdateui]=useState(false)
  const [products, setProducts] = useState([]);
  const model={
    title:'',
    description:'',
    price:'',
    discount:''
  }
  const [productform,setproductform]=useState(model)
  const[productmodel,setproductmodel]=useState(null)
  const [applycloseanimation,setapplycloseanimation]=useState(false)
  useEffect(()=>{
    const req=async()=>{
        const snapshot=await getDocs(collection(db,"products"))
        const tmp=[]
        snapshot.forEach((doc)=>{
            const allproducts=doc.data()
            allproducts.id=doc.id
            tmp.push(allproducts)        
        })
        setProducts(tmp)
    }
    req()
  },[updateui])
  console.log(products);
  const handlemodalclose=()=>{
    setapplycloseanimation(true)
    setTimeout(() => {
   setproductmodel(false)     
    }, 700);
    
  }
  const handlemodalopen=()=>{
    setapplycloseanimation(false)
    setproductmodel(true)
   
    
  }

  const handleproductform=(e)=>{
    const input=e.target
    const name=input.name
    const value=input.value
    setproductform({
        ...productform,
        [name]:value
    })
    
  }
  const createproduct=async (e)=>{
    try{
        e.preventDefault()
       await addDoc(collection(db,"products"),productform)
       setproductform(model)
       handlemodalclose()
       setupdateui(!updateui)
       new Swal({
        icon:'Success',
        title:'Product Added'
       })
    }
    catch(err){
        new Swal({
            icon:'error',
            title:'failed !',
            text:err.message
        })
    }
  }

  const uploadproductimg=async(e,id)=>{
    const input=e.target
    const file=input.files[0]
    // console.log(file);
    const path=`products/${Date.now()}.png`
   const url= await Uploadfile(file,path)
   const ref=doc(db,"products",id)
   await updateDoc(ref,{image:url})
//    alert("success")
setupdateui(!updateui)
    
  }
  return (
    <Layout>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="mb-4 text-xl font-semibold">Products</h1>
          <button className="px-4 py-2 text-white bg-indigo-600 rounded" onClick={handlemodalopen}>
            <i className="mr-2 ri-sticky-note-add-line"></i>
            New Product
          </button>
        </div>
        {/* <h1 className="mb-4 text-xl font-semibold">Products</h1> */}
        <div className="grid gap-5 mt-8 md:grid-cols-4">
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-md shadow-lg">
            <div className="relative">
            <img
                src={ item.image? item.image:"/images/website avt.jpg"}
                alt=""
                className="rounded-t-md w-full h-[270px] object-cover"
              />
              <input
              onChange={(e)=>uploadproductimg(e,item.id)}
               type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
               />
            </div>
              <div className="p-4">
                <h1 className="text-lg font-semibold capitalize ">{item.title}</h1>
                <p className="text-gray-600">
                  {item.description.slice(0, 50)}...
                </p>
                <div className="flex gap-2 mt-2">
                  <label>
                    ₹{item.price - (item.price * item.discount) / 100}
                  </label>
                  <del className="font-semibold">₹{item.price}</del>
                  <label className="text-gray-600">
                    {" "}
                    ({item.discount} Off)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {
            productmodel &&
            <div className={`absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-80 animate__animated ${applycloseanimation?'animate__fadeOut':'animate__fadeIn'}`}>
            <div className={`relative w-6/12 px-6 py-5 bg-white border rounded-md border-1 animate__animated ${applycloseanimation?'animate__zoomOut':'animate__zoomIn'} animate__faster`}>
              <button className="absolute right-3 top-2" onClick={handlemodalclose}>
                <i className="text-lg ri-close-circle-line "></i>
              </button>
              <h1 className="text-lg font-semibold">New product</h1>
              <form action="" className="grid grid-cols-2 gap-6 mt-4 " onSubmit={createproduct}>
                <input
                required
                  type="text"
                  name="title"
                  placeholder="Enter product title here"
                  className="col-span-2 p-2 border border-gray-400 rounded"
                  onChange={handleproductform}
                  value={productform.title}
                />
  
                <input
                required
                  type="number"
                  name="price"
                  placeholder="price"
                  className="p-2 border border-gray-400 rounded"
                //   value={handleproductform}
                onChange={handleproductform}
                value={productform.price}
                />
  
                <input
                required
                  type="number"
                  name="discount"
                  placeholder="Discount"
                  className="p-2 border border-gray-400 rounded"
                //   value={handleproductform} 
                onChange={handleproductform}
                value={productform.discount}
                />
  
                 <textarea
                  type="text" 
                  name="description"
                  placeholder="description"
                  className="col-span-2 p-2 border border-gray-400 rounded"
                  rows={8}
                //   value={handleproductform}
                onChange={handleproductform}
                value={productform.description}
                  />
                  <div>
                  <button className="px-4 py-2 text-white bg-indigo-600 rounded">Submit</button>
                  </div>
                
              </form>
            </div>
          </div>
        }
      
      </div>
    </Layout>
  );
};
export default Product;
