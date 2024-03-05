import {useState} from "react";
import NoteContext from "./noteContext"; // importing created NoteContext to use it.
import { json } from "react-router-dom";


const NoteState = (props) =>{
// Whatever state variables , Functions written here can be imported and used in any component in project

// // vid-59 *****************************************************************************
//     const D1 ={
//         "name":"Saipavan",
//         "education":"Btech.CSE"
//     }
    
//     const [details ,setDetails] =useState(D1);

//     const update =()=>{

//         setTimeout(()=>{
//             setDetails({ "name":"Saipavannnnnnnnnn",
//             "education":"Btech.CSEEEEEEEEEWWWWWW"})
//         },2000)

//     }

// Assigining notes manually without api calls - for Client side basic demo

const host = 'http://localhost:3000'; // USE  BACKEND PORT - 3000 , NOT FRONT END REACT PORT -5000
const notesInitial =[
  // {
  //   "_id": "65451a685fee3c22bde28b7a",
  //   "user": "6544e0e5ed8d7c9e8a590eb9",
  //   "title": "FIRSTTTTT NOTE",
  //   "description": "This is my firsttt note in inotebook",
  //   "tag": "firsttttt",
  //   "Date": "2023-11-03T16:06:00.099Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "65451aaa5fee3c22bde28b7d",
  //   "user": "6544e0e5ed8d7c9e8a590eb9",
  //   "title": "SECOND NOTE",
  //   "description": "This is my second note in inotebook",
  //   "tag": "second",
  //   "Date": "2023-11-03T16:07:06.955Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "654bc2c21f64f34ad34ce0cb",
  //   "user": "6544e0e5ed8d7c9e8a590eb9",
  //   "title": "FOURTH NOTE",
  //   "description": "This is my fourth note in inotebook",
  //   "tag": "fourth",
  //   "Date": "2023-11-08T17:17:54.458Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "654bc2d51f64f34ad34ce0cd",
  //   "user": "6544e0e5ed8d7c9e8a590eb9",
  //   "title": "FIFTH NOTE",
  //   "description": "This is my fifth note in inotebook",
  //   "tag": "fifth",
  //   "Date": "2023-11-08T17:18:13.827Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "654bc2e61f64f34ad34ce0cf",
  //   "user": "6544e0e5ed8d7c9e8a590eb9",
  //   "title": "SIXTH NOTE",
  //   "description": "This is my sixth note in inotebook",
  //   "tag": "sixth",
  //   "Date": "2023-11-08T17:18:30.581Z",
  //   "__v": 0
  // }
];

  const [notes,SetNotes] = useState(notesInitial);

// get all notes function

const getNotes = async () => {
  // API CALLS
  console.log("TOKEN IN LOCAL STORAGE AT GETNOTED FUNCTION : - " +localStorage.getItem('token'))
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //"given-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODM1YmY3ZDRiYWU0MjgxYmEwNjZiIn0sImlhdCI6MTcwMjM3Njg5NX0.as30ph93wTbBz8cyu-wnFK4RlSaoOMhKGWkox4usf1g",
      "given-auth-token" : localStorage.getItem('token'),
    },
  });

  const json = await response.json();
  console.log("IN FERTCH ALL NOTES"+json);
   SetNotes(json);

}

// // add Note function
// const addNote = async (title,description,tag)=>{
//   // API CALLS
//   try{
//   const response = await fetch(`${host}/api/notes/addnewnote`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       //"given-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODM1YmY3ZDRiYWU0MjgxYmEwNjZiIn0sImlhdCI6MTcwMjM3Njg5NX0.as30ph93wTbBz8cyu-wnFK4RlSaoOMhKGWkox4usf1g",
//       "given-auth-token" : `${localStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
//   });

//   const note = await response.json();
//   SetNotes(notes.concat(note));
// }catch(error){
//   console.log("error in add note noteState.js try-catch "+error)
// }


// }

const addNote = async (title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/addnewnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "given-auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const jsonResponse = await response.json();
    
    // Check if the response is successful
    if (!response.ok) {
      console.error("Server error:", jsonResponse); // Log the error message
      // You can throw an error here or handle it in another way
      throw new Error("Server error");
    }

    SetNotes(notes.concat(jsonResponse));
  } catch (error) {
    console.error("Error in add note noteState.js try-catch:", error);
  }
};





// delete note

const deleteNote = async (id)=>{

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      //"given-auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODM1YmY3ZDRiYWU0MjgxYmEwNjZiIn0sImlhdCI6MTcwMjM3Njg5NX0.as30ph93wTbBz8cyu-wnFK4RlSaoOMhKGWkox4usf1g"
      "given-auth-token" :localStorage.getItem('token'),
    },
  });


  console.log("Deleting Note With ID : "+id);
  const filteredNotes =  notes.filter((note)=>{return (note._id !== id)});
  SetNotes(filteredNotes);

}


// edit note

const editNote = async (id,title,description,tag)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
     // "given-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODM1YmY3ZDRiYWU0MjgxYmEwNjZiIn0sImlhdCI6MTcwMjM3Njg5NX0.as30ph93wTbBz8cyu-wnFK4RlSaoOMhKGWkox4usf1g"
      "given-auth-token" :localStorage.getItem('token'),
    },
    body: JSON.stringify({title,description,tag}), 
  });

  const json = await response.json();
  
  
  // Create a deep copy of notes -> newNotes 
  //  -> must do this to update frontend without reload
  let newNotes = JSON.parse(JSON.stringify(notes))

  for(let index=0 ; index < newNotes.length ; index++){
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
    // break ; must not be here
  }
  SetNotes(newNotes); 
}


const [userDetails,SetuserDetails] = useState("unknown user");
const getuserdetails = async () => {
  // API CALLS
  console.log("TOKEN IN LOCAL STORAGE AT GETUSER DETAILS FUNCTION : - " +localStorage.getItem('token'))
  const response = await fetch(`${host}/api/auth/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //"given-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ODM1YmY3ZDRiYWU0MjgxYmEwNjZiIn0sImlhdCI6MTcwMjM3Njg5NX0.as30ph93wTbBz8cyu-wnFK4RlSaoOMhKGWkox4usf1g",
      "given-auth-token" : localStorage.getItem('token'),
    },
  });

  const json = await response.json();
  console.log("IN GET USeRR DETAILS NOTE STATE"+json);
   SetuserDetails(json);

}





    return (
// write all variables,functions here in value={{  }} to use them further

        <NoteContext.Provider value={{notes,SetNotes,addNote,deleteNote,getNotes,editNote,getuserdetails,userDetails}}>
            {props.children}
        </NoteContext.Provider>

// Any components wrapped between <NoteState></NoteState> in App.js
// will be able to use all these variables and functions

    )
}

export default NoteState;