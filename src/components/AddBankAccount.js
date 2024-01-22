import React,{useState} from 'react'
import Your_Accounts from './Your_Accounts';


export default function AddBankAccount() {
    const host = 'http://localhost:3000';

    const [accounts,SetAccounts] = useState([]);
    const [account,setAccount]=useState({title:"",description:"",tag:""});

    const handleAddNote =(e)=>{
        e.preventDefault();
        addNote(account.title,account.description,account.tag);
        setAccount({title:"",description:"",tag:""}); // to clear the form with entered values once submitted
    }

    const addNote = async (title, description, tag) => {
        try {
          const response = await fetch(`${host}/api/notes/addnewaccount`, {
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
      
          setAccount(accounts.concat(jsonResponse));
        } catch (error) {
          console.error("Error in add note noteState.js try-catch:", error);
        }
      };
      
    const onnnChange =(e)=>{
        setAccount({...account,[e.target.name]:e.target.value});
   }

  return (
    <div className="container my-4">

    <h3> CREATE NEW BANK ACCOUNT NOTE </h3>
    <form className="my-2">
        <div className="mb-3">
            <label htmlFor="title" className="form-label">ACCOUNT HOLDER NAME</label>
            <input type="text" className="form-control" value={account.title} name="title" id="title" aria-describedby="emailHelp" onChange={onnnChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">ACCOUNT TYPE</label>
            <input type="text" className="form-control" value={account.description} name="description" id="description" onChange={onnnChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">BALANCE</label>
            <input type="text" className="form-control" value={account.tag} name="tag" id="tag" onChange={onnnChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAddNote}>AddNote</button>
    </form>
    <Your_Accounts/>
</div>

  )
}
