import React from 'react';

export default function Logout() {
  return (
    <div className=" d-flex justify-content-center align-items-center container my-4 text-center ">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Logged Out Successfully</h5>
          <p className="card-text">You have been successfully logged out.</p>
          <h5 className="card-title">Please click on login to login again</h5>
        </div>
      </div>
    </div>
  );
}
