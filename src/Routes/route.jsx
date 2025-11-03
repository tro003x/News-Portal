import { createBrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import MainHome from "../Pages/MainHome";
import CategoryNews from "../Pages/CategoryNews";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import NewsDetails from "../Pages/NewsDetails";
import AuthLayout from "../layouts/AuthLayout";
import Blog from "../Pages/BlogPage.jsx";
import About from "../Pages/About.jsx";
import GettingStarted from "../Pages/resources/GettingStarted";
import FAQ from "../Pages/resources/FAQ";
import Support from "../Pages/resources/Support";


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
                path: 'about',
                element: <About></About>
            },
            {
                path: 'blog',
                element: <Blog></Blog>
            },
            {
                path: 'news/:id',
                element: <NewsDetails></NewsDetails>
            }
            ,
            {
                path: 'resources/getting-started',
                element: <GettingStarted />
            },
            {
                path: 'resources/faq',
                element: <FAQ />
            },
            {
                path: 'resources/support',
                element: <Support />
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
