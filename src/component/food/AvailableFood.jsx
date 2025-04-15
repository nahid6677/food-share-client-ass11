import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AvailableFood = () => {
    const {foods,setFood, users} = useContext(AuthContext)
    // const [foods, setFood] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/foods?email=${users.email}`,{
            withCredentials: true
        })
            .then(response => {
                setFood(response.data)
                console.log(response.data)
            })
    }, [users])
    return (
        <div className=' '>
            <div className="flex justify-between py-3 rounded-md px-2 bg-gray-600">
                <button className='btn'>All Food</button>
                <button className='btn'>Sort by Date</button>
            </div>
            <div className='grid sm:grid-cols-2 p-3 md:grid-cols-3  gap-5 mx-auto container'>
                {
                    foods.map((food, idx) =>
                        <div key={idx} className="card bg-base-100 w-full shadow-xl">
                            <figure>
                                <img
                                    className='w-full'
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="food" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    Food Name: {food.name}
                                </h2>
                                <p>Location: {food.location}</p>
                                <p className={``}>Status : <span className={`${food?.status && "text-green-500"}`}>{food.status}</span></p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">{food.expireDate}</div>
                                    <Link to={`/fooddetails/${food._id}`}><div className="badge badge-outline">Details</div></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AvailableFood;