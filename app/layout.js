import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";



export const metadata = {
  title:"Promptomia",
  description : "Discover & Share AI prompt "
}




const RootLayout = ({children}) => {

  
  return (
   <html lang="en">
    <body>
      <Provider>

    
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Nav/>
        {children}
      </div>
      </Provider>
    </body>

   </html>
  )
}

export default RootLayout