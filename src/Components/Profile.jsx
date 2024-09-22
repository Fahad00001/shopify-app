import { useEffect, useState } from "react";
import firebaseAppConfig from "../Utils/firebase-config";
import { onAuthStateChanged, getAuth,updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Swal from "sweetalert2";
import { getFirestore,collection,addDoc,where,getDocs,query, updateDoc,doc} from "firebase/firestore";
import Uploadfile from "../Utils/Storage";

const auth = getAuth(firebaseAppConfig);
const db=getFirestore(firebaseAppConfig)
// const storage=getStorage()
// const bucket=ref(storage,'picture')
const Profile = () => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [formvalue, setFormValue] = useState({
    fullname:'',
    email: "",
    mobile: "",
  });
  const[isAddress,setIsAddress]=useState(false)
  const [docid,setdocid]=useState(null)
  const[isupdated,setisupdated]=useState(false)
  const [addressformvalue,setAddressformvalue]=useState({
    address:'',
    city:"",
    state:'',
    country:'',
    pincode:'',
    userId:'',
  })
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(false);
        navigate("/login");
      }
    });

  }, []);
  
  useEffect(() => {
    const req= async()=>{
      if (session) {
        setFormValue({
          ...formvalue,
          fullname: session.displayName,
          mobile:(session.phoneNumber?session.phoneNumber:'')
        });
        setAddressformvalue({
          ...addressformvalue,
          userId:session.uid
        })
  
        // fetching adddress
        const ref=collection(db,"addresses")
      const q=query(ref,where("userId","==",session.uid))
      const snapshot= await getDocs(q)
     setIsAddress(!snapshot.empty)
     
      snapshot.forEach((doc)=>{
        setdocid(doc.id);
        const address=doc.data();
        setAddressformvalue({
         ... addressformvalue,
         ...address
       
        })
      })

      }
    }
    req();
    
  }, [session,isupdated]);
    
  const setProfilePicture = async (e) => {
    const input = e.target;
    const file = input.files[0];
    // console.log(file);
    const filenameArray = file.name.split(".");
    const ext = filenameArray[filenameArray.length - 1];
    const filename = Date.now() + "." + ext;
    const path = `pictures/${filename}`;
    // const bucket = ref(storage, path);
    setUploading(true);

    // const snapshot = await uploadBytes(bucket, file);
    const url = await Uploadfile(file,path);
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
    // console.log("success");
    setUploading(false);
    setSession({
      ...session,
      photoURL: url,
    });
  };
  const handleFormValue = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormValue({
      ...formvalue,
      [name]: value,
    });
  };
  const saveProfileInfo = async (e) => {
    e.preventDefault();
    // console.log(formvalue);
    await updateProfile(auth.currentUser, {
      displayName: formvalue.fullname,
      phoneNumber: formvalue.mobile,
    });
    new Swal({
      icon: "success",
      title: "profile saved",
    });
    // const tmp=formvalue
    // delete tmp.email
    // console.log(tmp);
  };
  const setAddress =async (e)=>{
    try{
        e.preventDefault()
        // console.log(addressformvalue);
       await addDoc(collection(db,"addresses"),addressformvalue)
       setIsAddress(true)
       setisupdated(!isupdated)
       new Swal({
        icon:'success',
        title:' Address saved'
       })
       
    }
    catch(err)
    {
        console.log(err);
        new Swal({
          icon:'error',
          title:'failed !',
          text:err.message
        })
        
    }
   
}
const updateaddress =async (e)=>{
  try{
      e.preventDefault()
      // const col=collection(db,"addresses")
    const ref=doc(db,"addresses",docid)
   await updateDoc(ref,addressformvalue)
   setisupdated(!isupdated)
   new Swal({
    icon:'Success',
    title:'Addresses updated !',
   
  })
   
   
  }
  catch(err)
  {
      // console.log(err);
      new Swal({
        icon:'error',
        title:'failed !',
        text:err.message
      })
      
  }
 
}

 
const handleAddressformvalue=(e)=>{
    const input=e.target
    const name=input.name
    const value=input.value
    setAddressformvalue({
        ...addressformvalue,
        [name]:value
    })
    
} 




  
  if (session=== null)
    return (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-600 ">
        <span className="relative flex w-6 h-6">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
          <span className="relative inline-flex w-6 h-6 rounded-full bg-sky-500"></span>
        </span>
      </div>
    );
  return (
    <Layout>
    {/* <h1>{ JSON.stringify(addressformvalue)}</h1> */}
      <div className="p-8 mx-auto border rounded-md shadow-lg md:my-16 md:w-7/12">
        <div className="flex gap-3">
          <i className="text-4xl ri-user-line"></i>
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <hr className="my-6" />
        <div className="relative w-24 h-24 mx-auto mb-6">
          { uploading ? 
            <img src="/images/loading_icon.gif" alt="" />
           :
            <img
              src={session.photoURL ? session.photoURL : "/images/avt.png"}
              className="w-24 h-24 mb-6 rounded-full"
              alt=""
            />
          }
          {/* <img src="/images/loading_icon.gif" alt="" /> */}
          {/* <img src={session.photoURL?session.photoURL:"/images/avt.png"}className="w-24 h-24 mb-6 rounded-full" alt="" /> */}
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 "
            onChange={setProfilePicture}
          />
        </div>
        {/* <img src="/images/avt.png"className="w-24 h-24 mx-auto mb-6 rounded-full" alt="" /> */}
        <form className="grid grid-cols-2 gap-6" onSubmit={saveProfileInfo}>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Fullname</label>
            <input
              onChange={handleFormValue}
              required
              name="fullname"
              className="p-2 border border-gray-300 rounded"
              value={formvalue.fullname}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Email</label>
            <input 
            disabled
              onChange={handleFormValue}
              required
              name="email"
              type="email"
              className="p-2 border border-gray-300 rounded"
              value={session.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Mobile</label>
            <input
              onChange={handleFormValue}
              required
              name="mobile"
              type="number"
              className="p-2 border border-gray-300 rounded"
              value={formvalue.mobile}
            />
          </div>
          <br />
          <button className="px-4 py-2 text-white rounded bg-rose-600 w-fit hover:bg-green-600">
            <i className="mr-2 ri-save-line"></i>
            Save
          </button>
        </form>
      </div>
      <div className="p-8 mx-auto border rounded-md shadow-lg md:my-16 md:w-7/12">
        <div className="flex gap-3">
          <i className="text-4xl ri-link-unlink-m"></i>
          <h1 className="text-3xl font-semibold">Delievery Address</h1>
        </div>
        <hr className="my-6" />

        {/* <img src="/images/avt.png"className="w-24 h-24 mx-auto mb-6 rounded-full" alt="" /> */}
        <form className="grid grid-cols-2 gap-6" onSubmit={isAddress?updateaddress:setAddress}>
          <div className="flex flex-col col-span-2 gap-2">
            <label className="text-lg font-semibold">Area/street/village</label>
            <input
              onChange={handleAddressformvalue}
              required
              name="address"
              type="text"
              className="p-2 border border-gray-300 rounded"
              value={addressformvalue.address}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">City</label>
            <input
                  onChange={handleAddressformvalue}
              required
              name="city"
              type="text"
              className="p-2 border border-gray-300 rounded"
              value={addressformvalue.city}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">State</label>
            <input
             onChange={handleAddressformvalue}
              required
              name="state"
              type="text"
              className="p-2 border border-gray-300 rounded"
              value={addressformvalue.state}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Country</label>
            <input
             onChange={handleAddressformvalue}
              required
              name="country"
              type="text"
              className="p-2 border border-gray-300 rounded"
              value={addressformvalue.country}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">Pincode</label>
            <input
            onChange={handleAddressformvalue}
              required
              name="pincode"
              type="number"
              className="p-2 border border-gray-300 rounded"
              value={addressformvalue.pincode}
            />
          </div>
          {
            isAddress ?
            <button className="px-4 py-2 text-white rounded bg-rose-600 w-fit hover:bg-green-600">
            <i className="mr-2 ri-save-line"></i>
            Save
          </button>
          :
              
          <button className="px-4 py-2 text-white bg-indigo-600 rounded w-fit hover:bg-gray-600">
            <i className="mr-2 ri-save-line"></i>
            Submit
          </button>
            
          }

         
      
        </form>
        
      </div>
    </Layout>
  );
};
export default Profile;
