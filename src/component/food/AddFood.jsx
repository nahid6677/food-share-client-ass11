import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../context/AuthContext';

const AddFood = () => {
    const {users} = useContext(AuthContext);
    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const imageURL = form.url.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const expireDate = form.expireDate.value;
        const notes = form.note.value;
        const donerName = users.displayName;
        const donerImage = users.photoURL;
        const donerEmail = users.email;
        const status = "Available"
        const food = { name, imageURL, quantity,status, location, expireDate, notes, donerName, donerImage, donerEmail };
        console.log(food)
        axios.post(`http://localhost:5000/foods`, food)
            .then(response => {
                console.log(response.data)
                if(response.data.insertedId){
                    Swal.fire("Add Your Food Successfull!");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="flex justify-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleAddFood} className="card-body p-7 space-y-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Food Name</span>
                        </label>
                        <input type="text" placeholder="Name" name='name' className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Food Image</span>
                        </label>
                        <input type="text" placeholder="URL" name='url' className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Food Quantity</span>
                        </label>
                        <input type="text" placeholder="Food Quantity" name='quantity' className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Pickup Location</span>
                        </label>
                        <input type="text" placeholder="Pickup Location" name='location' className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Expired Date/Time</span>
                        </label>
                        <input type="date" placeholder="Pickup Location" name='expireDate' className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Additional Notes</span>
                        </label>
                        <input type="text" placeholder="Additional Notes" name='note' className="input w-full input-bordered" required />
                    </div>
                    <div className=" mt-6">
                        <button className="btn w-full btn-neutral">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;