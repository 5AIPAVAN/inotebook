import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom' // lastest version of useHistory read->react router docs

export default function Login() {

    let navigate = useNavigate();

    const [details,setDetails] = useState({email:"",password:""});

    const handleOnSubmit = async (e) => { // on submit login form -> check details-valid or not
        e.preventDefault();
        // API CALLS
        // user login api call
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:details.email , password: details.password }), // body data type must match "Content-Type" header
        });

        const json = await response.json(); // catch and print the response
        console.log(json);

        if(json.success){    // if response contains success:true
           // redirect to home page
           // store users jwt token in local storage and redirect
           console.log("login user token :-" +json.jwttoken);
           localStorage.setItem('token',json.jwttoken)
           navigate("/")// redirect to home page

        }else{      // if response contains success:false
            alert("LOGIN FAILED -INVALID CREDENTIALS");
        }
    }


    const onnnChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        
    }

    return (
        <div className="container my-4">

            <form onSubmit={handleOnSubmit}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={onnnChange} className="form-control" id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" onChange={onnnChange} className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

            </form>


        </div>
    )
}
