
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../main/Main";
import Home from "../home/Home";
import Login from "../ragister/Login";
import Signup from "../ragister/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            }
        ]
    },
]);



export default router;