// import React,{useState} from 'react'
// import {  useNavigate } from 'react-router-dom' // lastest version of useHistory read->react router docs

// export default function Login() {

//     let navigate = useNavigate();

//     const [details,setDetails] = useState({email:"",password:""});

//     const handleOnSubmit = async (e) => { // on submit login form -> check details-valid or not
//         e.preventDefault();
//         // API CALLS
//         // user login api call
//         const response = await fetch(`http://localhost:3000/api/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email:details.email , password: details.password }), // body data type must match "Content-Type" header
//         });

//         const json = await response.json(); // catch and print the response
//         console.log(json);

//         if(json.success){    // if response contains success:true
//            // redirect to home page
//            // store users jwt token in local storage and redirect
//            console.log("login user token :-" +json.jwttoken);
//            localStorage.setItem('token',json.jwttoken)
//            navigate("/")// redirect to home page

//         }else{      // if response contains success:false
//             alert("LOGIN FAILED -INVALID CREDENTIALS");
//         }
//     }


//     const onnnChange = (e) => {
//         setDetails({ ...details, [e.target.name]: e.target.value });
        
//     }

//     return (
//         <div className="container my-4">

//             <form onSubmit={handleOnSubmit}>

//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input type="email" name="email" onChange={onnnChange} className="form-control" id="email" aria-describedby="emailHelp" />

//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" name="password" onChange={onnnChange} className="form-control" id="password" />
//                 </div>

//                 <button type="submit" className="btn btn-primary">Submit</button>

//             </form>


//         </div>
//     )
// }






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//     const navigate = useNavigate();

//     const [details, setDetails] = useState({ email: "", password: "" });
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleOnSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch(`http://localhost:3000/api/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: details.email, password: details.password }),
//         });

//         const json = await response.json();

//         if (json.success) {
//             // Set success message
//             setSuccessMessage('Login successful');
//             // Store user's JWT token in local storage
//             localStorage.setItem('token', json.jwttoken);
//         } else {
//             // Set error message
//             setErrorMessage('Login failed - Invalid credentials');
//         }
//     }

//     const onChange = (e) => {
//         setDetails({ ...details, [e.target.name]: e.target.value });
//     }

//     useEffect(() => {
//         // Check if there is a success message (indicating successful login)
//         if (successMessage) {
//             // Redirect to home page after a short delay to ensure the component is fully rendered
//             const redirectTimeout = setTimeout(() => {
//                 navigate("/");
//             }, 1000);

//             return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
//         }
//     }, [successMessage, navigate]);

//     return (
//         <div className="container my-4">
//             {successMessage && (
//                 <div className="alert alert-success" role="alert">
//                     {successMessage}
//                 </div>
//             )}

//             {errorMessage && (
//                 <div className="alert alert-danger" role="alert">
//                     {errorMessage}
//                 </div>
//             )}

//             <form onSubmit={handleOnSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" name="password" onChange={onChange} className="form-control" id="password" />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//         </div>
//     )
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [details, setDetails] = useState({ email: "", password: "" });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: details.email, password: details.password }),
        });

        const json = await response.json();

        if (json.success) {
            // Set success message
            setSuccessMessage('Login successful');
            // Store user's JWT token in local storage
            localStorage.setItem('token', json.jwttoken);
        } else {
            // Set error message
            setErrorMessage('Login failed - Invalid credentials');
        }
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        // Check if there is a success message (indicating successful login)
        if (successMessage) {
            // Redirect to home page after a short delay to ensure the component is fully rendered
            const redirectTimeout = setTimeout(() => {
                navigate("/");
            }, 1000);

            return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
        }
    }, [successMessage, navigate]);

    return (
        <div className="container my-4">
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={onChange}
                            className="form-control"
                            id="password"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
