import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom' 

export default function Signup() {
    let navigate = useNavigate();
    const [details,setDetails] = useState({name:"",email:"",password:"",cpassword:""});
    const handleOnSubmit = async (e) => { // on submit login form ->create new user using api calls
        e.preventDefault();
        // API CALLS
        const response = await fetch(`http://localhost:3000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:details.name,email:details.email,password: details.password}), // body data type must match "Content-Type" header
        });

        const json = await response.json(); // catch and print the response
        console.log(json);
        if(json.success){
        localStorage.setItem('token',json.jwttoken);
        navigate("/")// redirect to home page
        }else{
            alert("signup failed");
        }

    }

    const onnnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        
    }

    return (
        <div className='container'>
            <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                    <label htmlhtmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" value={details.name} onChange={onnnChange} className="form-control" id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlhtmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" value={details.email} onChange={onnnChange} className="form-control" id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={details.password}  onChange={onnnChange} className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" name="cpassword" value={details.cpassword} onChange={onnnChange} className="form-control" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
