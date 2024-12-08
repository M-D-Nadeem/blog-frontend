import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import "./index.css"

// import HomePage from './pages/HomePage.jsx'
import Auth from "./pages/Auth.jsx"
import NotFoundPage from './pages/NotFoundPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import BlogList from './pages/BlogList.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import AddBlog from './pages/AddBlog.jsx'

const appRouter=createBrowserRouter([
  {
   path:"/",
   element:
   <Provider store={store} >
   <>
   {/* <PublicRoute> */}
   <GoogleOAuthProvider clientId="566714532811-8tkhru7k9raptnagbns482blifi29ggv.apps.googleusercontent.com">

   <Auth />
   </GoogleOAuthProvider>
   {/* </PublicRoute> */}
   <Toaster />
   </>
   </Provider>,
  },
  {
    path:"/blog",
    element: 
    <Provider store={store} >
    <>
    {/* <ProtectedRoute> */}
    <App />
    {/* </ProtectedRoute> */}
    <Toaster />
    </>
    </Provider>,
    children:[
  {
    path:"/blog/blogList",
    element:<BlogList />
  },
  {
    path:"/blog/blogs/:id",
    element:<BlogDetails />
  },
  {
    path:"/blog/addPost",
    element:<AddBlog />
  },
  

  // {
  //   path:"/denied",
  //   element:<DeniedPage />
  // },

    
],
errorElement:<NotFoundPage />,


  },

  
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
)
