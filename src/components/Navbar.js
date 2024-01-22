import React from 'react'
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  let navigate = useNavigate();

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]); //triggers whenever location(path) changes


  const handleLogOut=()=>{
    localStorage.removeItem('token');

    navigate("/login")// redirect to login page if not login

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
          </li>
          {/* <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">About</Link>
          </li> */}
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/allblogs" ? "active" : ""}`} to="/allblogs">All Blogs</Link>
          </li>
          {/* <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/Add_bank_account" ? "active" : ""}`} to="/Add_bank_account">ADD BANK ACCOUNT</Link>
          </li> */}
        </ul>
      { !localStorage.getItem('token') ?<div className="d-flex" >
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign-up</Link>
      </div> : <Link className="btn btn-primary mx-2" onClick={handleLogOut} to="/logout" role="button">Logout</Link> }
      </div>
    </div>
  </nav>
  )
}
