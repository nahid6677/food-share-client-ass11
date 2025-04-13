import React from 'react';
import { useLoaderData } from 'react-router-dom';

const FoodDetails = () => {
    const {donerName, donerImage, expireDate, imageURL, location, name, notes, quantity} = useLoaderData()
    console.log(donerName, donerImage, expireDate, imageURL, location, name, notes, quantity)
    return (
        <div className='container mx-auto px-2 sm:px-0 '>
            FoodDetails
        </div>
    );
};

export default FoodDetails;