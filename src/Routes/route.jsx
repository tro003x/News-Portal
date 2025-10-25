import { createBrowserRouter } from "react-router";
import Home from "../layouts/Home";
import MainHome from "../Pages/MainHome";
import CategoryNews from "../Pages/CategoryNews";


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
        element: <h2>Authentication</h2>
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
