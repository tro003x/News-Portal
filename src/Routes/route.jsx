import { createBrowserRouter } from "react-router";
import Home from "../layouts/Home";
import MainHome from "../Pages/MainHome";
import CategoryNews from "../Pages/CategoryNews";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
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
        path: '/news',
        element: <h2>News</h2>
    },

    {
        path: '*',
        element: <h2>Error</h2>
    },
]);
export default router;
