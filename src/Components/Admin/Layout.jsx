// import Product from './Product'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Link,useLocation } from 'react-router-dom'
const Layout= ({children})=>{
    const[size,setSize]=useState(280)
    const[mobilesize,setMobilesize]=useState(0)
    const[accountmenu,setAccountMenu]=useState(false)
    // const location=useLocation()
    const menus=[
        {
            label:'Dashboard',
            icon: <i class="ri-dashboard-3-line mr-2"></i>,
            link:"/admin/dashboard"
        },
        {
            label:'Customers',
            icon: <i class="ri-user-line mr-2"></i>,
            link:"/admin/customers"
        },
        {
            label:'Products',
            icon:   <i className="mr-2 ri-shopping-cart-line"></i>,
            link:"/admin/products"
        },
        {
            label:"Orders",
            icon:<i className="mr-2 ri-shape-line"></i>,
            link:"/admin/orders"
        },
        {
            label:"Payments",
            icon:<i className="mr-2 ri-money-dollar-circle-line"></i>,
            link:"/admin/payments"
        },
     
        {
            label:"Settings",
            icon:<i className="mr-2 ri-settings-3-line"></i>,
            link:"/admin/settings"
        }
       
    ]
    return(
    
        <>
      {/* /  desktop */}
         <div className='hidden md:block'>
            <aside className="fixed top-0 left-0 h-full overflow-hidden bg-indigo-600 "
            style={{
                width:size,
                transition:'0.3s'
            }}
            >  
            <div className='flex flex-col'>
            {/* <Link to="/admin/products" className='p-1   text-gray-50 text-[18px] hover:bg-rose-600 hover:text-white'>
            <i className="mr-2 ri-shopping-cart-line"></i>
                Products
            </Link> */}
            {
                menus.map((item,index)=>(
                    <Link key={index} to={item.link} className='p-1   text-gray-50 text-[18px] hover:bg-rose-600 hover:text-white'>
            {item.icon}
                {item.label}
            </Link>
                ))
            }
            <button className='p-1   text-gray-50 text-left text-[18px] hover:bg-rose-600 hover:text-white'>
            <i className="mr-2 ri-logout-circle-r-line"></i>
                Logout
            </button>
          
            </div>
            
            </aside>
            <section className="min-h-screen bg-gray-100" style={{
                marginLeft:size,
                transition:'0.3s'
            }}>
                <nav className="sticky top-0 left-0 flex items-center justify-between p-4 bg-white shadow">
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 bg-gray-50 hover:bg-indigo-400 hover:text-white"
                        onClick={()=>setSize(size===280?0:280)}
                        >
                        <i className="text-xl ri-menu-line"></i>
                        </button>
                    <h1 className="text-xl font-semibold">Shopcode</h1>
                    </div>
                    <div>
                        <button className="relative">
                            <img src="/images/avt.png"
                             className="w-10 h-10 rounded-full "
                              onClick={()=>setAccountMenu(!accountmenu)}
                                />
                            {
                                accountmenu && 
                                <div className="absolute top-18 right-0 bg-white  w-[200px] p-6 shadow-lg">
                                <div>
                                    <h1 className="text-lg font-semibold">fahad iqbal</h1>
                                    <p className="text-gray-500">fahad@gamail.com</p>
                                    <div className="h-px my-4 bg-gray-200"/>
                                    <button>
                                    <i className="mr-2 ri-logout-box-line"></i>
                                        Logout
                                    </button>
                                </div>

                            </div>

                            }
                   
                        </button>
                    </div>
                </nav>
                <div className='p-6'>
                    {children}
                </div>
                 
            </section>
        </div>
        {/* mobile */}
        <div className='block md:hidden'>
            <aside className="fixed top-0 left-0 z-50 h-full overflow-hidden bg-indigo-600 "
            style={{
                width:mobilesize,
                transition:'0.3s'
            }}
            >  
            <div className='flex flex-col'>
                <button  onClick={()=>setMobilesize(mobilesize===0?280:0)} className='mx-4 mt-4 text-left'>
                <i className="text-xl text-white ri-menu-line"></i>
                </button>
           
            {
                menus.map((item,index)=>(
                    <Link key={index} to={item.link} className='p-1 text-gray-50 text-[18px] hover:bg-rose-600 hover:text-white'>
            {item.icon}
                {item.label}
            </Link>
                ))
            }
               <button className='p-1   text-gray-50 text-left text-[18px] hover:bg-rose-600 hover:text-white'>
            <i className="mr-2 ri-logout-circle-r-line"></i>
                Logout
            </button>
          
            </div> 
            
            </aside>
            <section className="h-screen bg-gray-100" >
                <nav className="sticky top-0 left-0 flex items-center justify-between p-4 bg-white shadow">
                    <div className="flex items-center gap-4">
                        <button className="w-8 h-8 bg-gray-50 hover:bg-indigo-400 hover:text-white"
                        onClick={()=>setMobilesize(mobilesize===0?280:0)}
                        >
                        <i className="text-xl ri-menu-line"></i>
                        </button>
                    <h1 className="text-xl font-semibold">Shopcode</h1>
                    </div>
                    <div>
                        <button className="relative">
                            <img src="/images/avt.png"
                             className="w-10 h-10 rounded-full "
                              onClick={()=>setAccountMenu(!accountmenu)}
                                />
                            {
                                accountmenu && 
                                <div className="absolute top-18 right-0 bg-white  w-[200px] p-6 shadow-lg">
                                <div>
                                    <h1 className="text-lg font-semibold">fahad iqbal</h1>
                                    <p className="text-gray-500">fahad@gamail.com</p>
                                    <div className="h-px my-4 bg-gray-200"/>
                                    <button>
                                    <i className="mr-2 ri-logout-box-line"></i>
                                        Logout
                                    </button>
                                </div>

                            </div>

                            }
                   
                        </button>
                    </div>
                </nav>
                <div className='p-6'>
                    {children}
                </div>
                 
            </section>
        </div>
       
        </>
    )
}
export default Layout