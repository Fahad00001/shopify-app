import Layout from "./Layout"
import { useState } from "react"
const orders=()=>{
    const[orders,setOrders]=useState([
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },    {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        
        {
            orderid:"#12338",
            customername:"fahad",
            email:'fahad@gmail.com',
            mobile:"69211913628",
            product:"realme",
            amount:"10000",
            date:"21/03/2024 10:14:10 AM",
            status:"pending"
           
        },
        
        
        
        

       
    ])
    return(
        <Layout>
             <div>
            <h1 className="text-xl font-bold">Order</h1>
            <div className="mt-6">
            <table className=" w-full">
            <thead>
                <tr className="bg-rose-600 text-white ">
                    <th className="py-4">Order Id</th>
                    <th>Customer`s name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
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
                orders.map((item,index)=>(
                    <tr className="text-center" key={index} style={{
                        background:(index+1)%2===0?"#f1f5f9":"white"
                    }}>
                        <td className="p-4">{item.orderid}</td>
                        <td className="capitalize">{item.customername}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td className="capitalize">{item.product}</td>
                        <td>{item.amount.toLocaleString()}</td>
                        <td>{item.date}</td>
                        <td className="capitalize">
                            <select className="border p-1 border-gray-200">
                                <option value="pending">pending</option>
                                <option value="pending">processing</option>
                                <option value="pending">dispatched</option>
                                <option value="pending">returnrd</option>
                            </select>
                        </td>
                        
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
export default orders