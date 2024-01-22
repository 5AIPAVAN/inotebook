const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

// already in '/api/auth'
// router.get('/') means '/api/auth'
// router.get('/home') means '/api/auth/home'
// all routes here in this file are added to path '/api/auth'

//ROUTE-1 :

// ADD ALL VALIDATIONS HERE
// CREATE A USER - NO LOGIN REQUIRED - METHOD USED:- POST
router.post('/createuser', [
    body('name', 'ENTER A VALID NAME').isLength({ min: 3 }),
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password', 'ENTER A VALID PASSWORD').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // check if any errors in validation
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // **** TRY-CATCH - must and shoulf for good error handling ***
    try {
        // Check whether user with entered email already exists 
        let check_user = await User.findOne({ email: req.body.email });
        if (check_user) {
            return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
        }



        // if no errors (and when no user exists with given email as checked above)

        //generating salt for hashing
        const salt = await bcrypt.genSaltSync(10);
        //hashing user password and adding salt
        const encoded_password = await bcrypt.hashSync(req.body.password, salt);

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encoded_password
        })

        // USING JWT 

        const JWT_SECRET_KEY = "$@IPAVAN";

        const DATA = {
            user: {
                id: user.id
            }
        }
        const jwt_data = await jwt.sign(DATA, JWT_SECRET_KEY);
        console.log(jwt_data);
        success=true;

        res.json({success, result: "ADDED TO DATABASE SUCCESSFULLY", hashedpassword: encoded_password, jwttoken: jwt_data })

    } catch (error) {

        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");

    }


    // .then((user)=>{res.json(user)}) // if no errors - then executes
    // .catch((err)=>{console.log(err)   // if errors - catch block executed
    //          res.json({error:'PLEASE ENTER A UNIQUE VALUE FOR EMAIL',message:err.message})})

})



//****************************************************************************************************

//ROUTE-2 :

// USER LOGIN - POST method
// complete path -> /api/auth/login

router.post('/login', [
    body('email', 'ENTER A VALID EMAIL').isEmail(),
    body('password', 'ENTER A VALID PASSWORD(min length: 5 )').isLength({ min: 5 })
], async (req, res) => {


    // check if any errors in validation (during login)
    const errors = validationResult(req); // USE req NOT req.body HERE
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try{
         let success = false;
        // destructuring req.body to abstract email,password from it
        const {email,password}= req.body;

       // checking whether entered email is registered or not
        let found_user = await User.findOne({email});

        // if no user is found with entered email
        if(!found_user){
            return res.status(400).json({success, error:"USER DOES'NT EXIST"})
        }

        // if user exists -> check whether password is correct or not
        // returns true or false
        const passwordCompare = await bcrypt.compare(password,found_user.password);
       
        if(!passwordCompare){
            return res.status(400).json({success,error:"PASSWORD IS NOT CORRECT"})
        }

        //if correct password
        //send users data(same code snippet from create user end point)

        const DATA = {
            found_user: {
                id: found_user.id
            }
        }
        const JWT_SECRET_KEY = "$@IPAVAN";
        const jwt_data = await jwt.sign(DATA, JWT_SECRET_KEY);
        success=true;
      
       res.json({ success, result: "LOGIN SUCCESSFULL(user found)",jwttoken: jwt_data })




    }catch(error){

        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");

    }



})




//*************************************************************************************************** */

//ROUTE-3 :

// GET USER LOGGED-IN USER DETAILS , METHOD :- POST , LOGIN REQUIRED

router.post('/getuser', fetchuser , async (req, res) => {

 // sync (req, res) => {} is called after middleware function fetchuser is executed
  
    try{

        // we obtained req.user from middleware function -> fetchuser.js
        // obtain user id in userId variable
        const userId = req.user.id;

        // get all data of fetched user(using his userId) except "password" attribute from database
        const user = await User.findById(userId).select("-password");

        //  console.log(user);
      
       // send user data as response
        res.send(user);

    }catch(error){

        console.log("SOME ERROR OCCURED (try-catch) :" + error.message);
        res.status(500).send("SOME ERROR OCCURED (try-catch)");

    }

})





// need to export router from here (for index.js to work properly)
module.exports = router;