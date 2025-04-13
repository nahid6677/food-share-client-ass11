
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../main/Main";
import Home from "../home/Home";
import Login from "../ragister/Login";
import Signup from "../ragister/Signup";
import AddFood from "../food/AddFood";
import AvailableFood from "../food/AvailableFood";
import FoodDetails from "../food/FoodDetails";
import ManageMyFood from "../food/ManageMyFood";

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
            },
            {
                path: "/addfood",
                element: <AddFood></AddFood>
            },
            {
                path: "/availablefood",
                element: <AvailableFood></AvailableFood>
            },
            {
                path: "/managemyfood",
                element: <ManageMyFood></ManageMyFood>
            },
            {
                path: "/fooddetails/:id",
                element: <FoodDetails></FoodDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/foods/${params.id}`)
            },
        ]
    },
]);



export default router;