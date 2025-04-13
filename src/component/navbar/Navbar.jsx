import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { signout, setLoading, users } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  // console.log(users)
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logout From this site!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        signout()
          .then(() => {
            setLoading(false)
            // Swal.fire({
            //   title: "Logout!",
            //   text: "Successfull",
            //   icon: "success"
            // });
            // console.log("LOGOUT")
          })
      }
    });
  }
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  // Close menu if click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm py-7 px-5 bg-slate-700 relative" ref={menuRef}>
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={handleToggle} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <NavLink to="/" className=" text-xl">
          Food Line
        </NavLink>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-transparent  lg:hidden z-50">
          <ul className="menu p-4 bg-slate-700 rounded-lg space-y-2">
            <li><NavLink to="/" onClick={handleLinkClick}>Home</NavLink></li>
            <li><NavLink to="/availablefood" onClick={handleLinkClick}>Available Foods</NavLink></li>
            <li><NavLink to="/addfood" onClick={handleLinkClick}>Add Food</NavLink></li>
            <li><NavLink to="/managemyfood" onClick={handleLinkClick}>Manage My Foods</NavLink></li>
            <li><NavLink to="/myfoodrequest" onClick={handleLinkClick}>My Food Request</NavLink></li>
          </ul>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/availablefood">Available Foods</NavLink></li>
          <li><NavLink to="/addfood">Add Food</NavLink></li>
          <li><NavLink to="/managemyfood">Manage My Foods</NavLink></li>
          <li><NavLink to="/myfoodrequest">My Food Request</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end  lg:flex">
        {
          users ? <div className="flex items-center gap-2">
            {isValidUrl(users?.photoURL) ? (
              <img src={users.photoURL} alt="User" className="w-8 h-8 rounded-full" />
            ) : (
              <FaRegUserCircle className="w-8 h-8" />
            )}
            <button onClick={handleLogOut} className="btn">Log Out</button>
          </div>
            :
            <div className='flex gap-2 items-center'>
              <Link to={"/signup"}><button className='btn'>SignUp</button></Link>
              <Link to={"/login"}><button className='btn'>logIn</button></Link>
            </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
