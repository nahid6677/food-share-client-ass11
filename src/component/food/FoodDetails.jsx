import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const FoodDetails = () => {
    const { users, setFood, foods } = useContext(AuthContext);
    const { donerName, donerEmail, donerImage, expireDate, date, imageURL, location, name, notes, quantity, _id } = useLoaderData()
    const navigate = useNavigate()
    // console.log(donerName, donerEmail, donerImage, date, imageURL, location, name, notes, quantity)
    const isURL = (text) => {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    }
    const handleRequest = (e) =>{
        
    }
    const findDate = (format) => {
        const bdTime = new Date(format).toLocaleDateString('en-CA', {
            timeZone: 'Asia/Dhaka'
        })
        return bdTime;
    }
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/food/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount) {
                            setFood(foods.filter(food => food._id !== _id));
                            navigate("/managemyfood");
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }
    return (
        <div className='container mx-auto px-2 sm:px-0 '>
            <div className="mx-auto my-3 w-11/12 sm:w-2/3  ">
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure className='border h-64'>
                        {
                            isURL(imageURL) ? <img className='w-full h-full'
                                src={imageURL}
                                alt={name} /> : <h3>Image Not Found</h3>
                        }
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Food Name: {name}</h2>
                        <h2 className="card-title">Location: {location}</h2>
                        <h2 className="card-title">Quantity: {quantity}</h2>
                        <h2 className="card-title">Doner Name: {donerName}</h2>
                        <h2 className="card-title">Expire Date: {findDate(date)}</h2>
                        <p>{notes}</p>
                        {
                            users?.email && users?.email === donerEmail ? <div className=''>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Update</button>
                                    <button onClick={handleDelete} className="btn btn-primary">Delete</button>
                                </div>
                            </div> : <div className='flex justify-center'>
                                <button onClick={handleRequest} className='btn'>Request</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;