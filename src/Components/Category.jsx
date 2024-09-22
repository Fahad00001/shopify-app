import { useState } from "react"
import Layout from "./Layout"
const Category=()=>{
    const[category, setCategory]=useState([
        {
            title:"electronics"
        },
        {
            title:"Fashion"
        },
        {
            title:"Smartphone"
        },
        {
            title:"Furniture"
        },
      
    ])
    return(
        <Layout>
             <div className="p-8 md:p-16">
            <div className="grid gap-8 mx-auto md:w-10/12 md:gap-16 md:grid-cols-4">
                {
                    category.map((item,index)=>(
                        <div key={index} className="flex flex-col items-center justify-center p-8 bg-white border rounded-lg shadow-lg hover:bg-orange-600 hover:text-white">
                            <i className="text-6xl ri-menu-search-line"></i>
                            <h1 className="text-2xl font-bold text-center">{item.title}</h1>
                            
                        </div>
                        
                    ))
                }
            </div>
        </div>
        </Layout>
      
    )
}
export default Category