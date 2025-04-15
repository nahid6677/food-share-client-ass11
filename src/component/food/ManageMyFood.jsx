import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { VscEmptyWindow } from 'react-icons/vsc';
import { FaArrowsSpin } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ManageMyFood = () => {
    const { users,setFood, foods  } = useContext(AuthContext);
    // console.log(foods.filter( food => food?.donerEmail === users.email), users.email)
        const [myFood, setMyFood] = useState(foods.filter(food => food?.donerEmail === users.email))
        // console.log(myFood)
        // setMyFood()
    const findDate = (date) =>{
        const bdTime = new Date(date).toLocaleDateString('en-CA', {
            timeZone: 'Asia/Dhaka'
        })
        return bdTime;
    }
    const isURL = (text) => {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:5000/managemyfood?email=${users?.email}`,{
            withCredentials: true
        })
            .then(res => {
                setMyFood(res.data);
                console.log(res.data);
            })
    }, [users])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Food</th>
                            <th>Expire Date</th>
                            <th>Quantity</th>
                            <th>About</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myFood.map((food, idx) => <tr key={idx}>
                                <th>{idx + 1} </th>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-10 w-10 p-1">
                                                {
                                                    isURL(food?.imageURL) ? <img
                                                        src={food?.imageURL}
                                                        alt="food" /> : <FaArrowsSpin className='h-full w-full' />
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Food Name: {food?.name}</div>
                                            <div className="text-sm opacity-50">Location: {food?.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {findDate(food?.date)}
                                </td>
                                <td>{food?.quantity}</td>
                                <th>
                                    <Link to={`/fooddetails/${food._id}`}><button className="btn btn-ghost btn-xs">details</button></Link>
                                </th>
                            </tr>)
                        }

                    </tbody>
                    {/* foot */}

                </table>
            </div>
        </div>
    );
};

export default ManageMyFood;