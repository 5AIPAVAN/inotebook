import React, { useContext, useEffect, useState, useRef } from 'react'
import AccountItem from './AccountItem'
// import NoteContext from '../contexts/notes/noteContext';
// import { useNavigate } from 'react-router-dom';

export default function Your_Accounts() {

    // let navigate = useNavigate();

    // const items = useContext(NoteContext);
    // const { notes, getNotes ,editNote } = items;

    useEffect(() => {
        if(localStorage.getItem('token')){
       // getNotes()  
        }else{
            //navigate("/login")// redirect to login page if not login
        }
         // eslint-disable-next-line
    }, [])

    const host = 'http://localhost:3000';
    const [accounts,SetAccounts] = useState('');
    useEffect(()=>{
        const getAccounts = async () => {
            const response = await fetch(`${host}/api/notes/fetchallaccounts`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "given-auth-token" : localStorage.getItem('token'),
              },
            });
          
            const json = await response.json();
            console.log(json);
             SetAccounts(json);
          
          }
          getAccounts();
          console.log(accounts)
    },[accounts])

    //const [Edit_note, setEdit_Note] = useState({edit_id:"", edit_title: "", edit_description: "", edit_tag: "" });

    
    //const ref = useRef(null);


    // console.log(Edit_note);

    // const onnnChange = (e) => {
    //     setEdit_Note({ ...Edit_note, [e.target.name]: e.target.value });
    
        
    // }
    // const Close_ref = useRef(null);

    // const handleSaveChanges=(e)=>{
    //  console.log("Updating note.....");
    //  e.preventDefault();
    // editNote(Edit_note.edit_id,Edit_note.edit_title,Edit_note.edit_description,Edit_note.edit_tag);
    // Close_ref.current.click();
          
    // }

    return (
        <>
            <div className="row my-4">
                <h4>YOUR ACCOUNTS</h4>
                <div className="container">
                   <h5>{accounts.length ===0 && 'No Accounts To Display' }</h5> 
                </div>
                {accounts && accounts.map((note) => {
                    return <AccountItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}


