import React from 'react'
import { Link } from "react-router-dom";
import NoteContext from '../contexts/notes/noteContext';
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
    const items = useContext(NoteContext);
    const { userDetails,getuserdetails} = items;
    
  let navigate = useNavigate();

      useEffect(() => {
    const fetchUserDetails = async () => {
      if (localStorage.getItem('token')) {
        await getuserdetails();
      } else {
        navigate('/login'); // redirect to login page if not login
      }
    };

    fetchUserDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center" style={{ width: '300px', height: '150px' }}>
        <div className="card-body">
          <h5 className="card-title">Name: {userDetails.name}</h5>
          <p className="card-text">Email: {userDetails.email}</p>
          <Link to="/" className="btn btn-primary">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
