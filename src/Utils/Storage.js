// import firebaseAppConfig from "./firebase-config";
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";
const storage=getStorage()
const Uploadfile=async(file,path)=>{
    const bucket=ref(storage,path)
    const snapshot=await uploadBytes(bucket,file)
    // console.log(snapshot);
    const url=await getDownloadURL(snapshot.ref)
    return url

}
export default Uploadfile