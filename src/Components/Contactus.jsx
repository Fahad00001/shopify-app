    import Layout from "./Layout"
    const Contactus=()=>{
        return(
            <Layout>
                 <div>
                    <header className="mx-auto bg-white border md:w-6/12 md:my-16 md:shadow-lg">
                    <img src="/images/contact.jpg"  className="w-full" />
                    <div className="p-8">
                    <form className="space-y-6 ">
            
                <div className="flex flex-col">
                    <label className="mb-1 text-lg font-semibold">Email id</label>
                    <input
                    required
                    name="email id"
                    placeholder="example@gmail.com"
                    className="p-3 border border-gray-300 rounded"
                    
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-lg font-semibold">Your name</label>
                    <input
                    required
                    name="name"
                    placeholder="enter your name"
                    className="p-3 border border-gray-300 rounded"
                    
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-lg font-semibold">Message</label>
                    <textarea
                    required
                    name="Message"
                    placeholder=" Enter your Message here"
                    className="p-3 border border-gray-300 rounded"
                    rows={4}
                    
                    />
                </div>
               
                <button className="p-3 px-8 py-3 text-white bg-blue-600 rounded font-semiblod hover:bg-slate-500">Get Quote</button>
               </form>
                    </div>
                    </header>
          
            </div>
            </Layout>
         
        )
    }
    export default Contactus