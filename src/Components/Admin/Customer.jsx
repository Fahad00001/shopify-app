import Layout from "./Layout"
import { useState } from "react"
const customer=()=>{
    const[customer,setCustomer]=useState([
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
        {
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628", 
            date:"12:04:2024" ,
            Address:"shalimar garden"
        },
      

        
    ])
    return(
        <Layout>
             <div>
            <h1 className="text-xl font-bold">Customers</h1>
            <div className="mt-6">
            <table className=" w-full">
            <thead>
                <tr className="bg-rose-600 text-white text-left ">
                    {/* <th className="py-4">Order Id</th> */}
                    <th className="p-3">Customer`s name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Date</th>
                    <th>Address</th>
               
                </tr>
            </thead>
            <tbody>
                {/* <tr className="bg-white text-center">
                    <td className="py-4">fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                    <td>fahad</td>
                </tr> */}
                {
                customer.map((item,index)=>(
                    <tr  key={index} style={{
                        background:(index+1)%2===0?"#f1f5f9":"white"
                    }}>
                        
                        <td className="capitalize px-4 py-2">
                            <div className="flex gap-3 items-center">
                                <img src="/images/avt.png" className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col justify-center">
                                    <span className="font-semibold">{item.customername} </span>
                                <small className="text-gray-500">{item.date}</small>
                                </div>
                           
                            </div>
                            </td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.date}</td>
                        <td>{item.Address}</td>
                       
                        
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
</div>
        
        </Layout>
        
    )
}
export default customer