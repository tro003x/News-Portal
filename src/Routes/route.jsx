import { createBrowserRouter } from "react-router";
import Home from "../layouts/Home";
import MainHome from "../Pages/MainHome";
import CategoryNews from "../Pages/CategoryNews";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import NewsDetails from "../Pages/NewsDetails";
import AuthLayout from "../layouts/AuthLayout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        children:[
            {
                path:'',
                element:<MainHome></MainHome>,
            },
         
            {
                path:'/category/:id',
                element: <CategoryNews></CategoryNews>,
                loader: ()=> fetch('/news.json'),
            }
            ,
            {
                path: 'news/:id',
                element: <NewsDetails></NewsDetails>
            }
         
        ]

    },

    {
        path: '/auth',
        element:<AuthLayout></AuthLayout>,
        children: [
            {
                path:'/auth/signin',
                element: <SignIn></SignIn>
            },
            {
                path:'/auth/signup',
                element: <SignUp></SignUp>
            }
        ]
    },

    

    {
        path: '*',
        element: <h2>Error</h2>
    },
]);
export default router;
