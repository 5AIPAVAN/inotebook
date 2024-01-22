import React,{useEffect, useState} from 'react'
import NoteItem from './NoteItem'
import PublicNote from './PublicNote'

export default function AllBlogs() {

    const host = 'http://localhost:3000';
    const [notes,SetNotes] = useState('');

    // get all notes function
    
    useEffect(()=>{
        const getNotes = async () => {
            const response = await fetch(`${host}/api/notes/allnotes_in_db`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
          
            const json = await response.json();
            //console.log("IN FERTCH ALL NOTES"+json);
             SetNotes(json);
          
          }
          getNotes();
          console.log(notes)
    },[])
 

  return (
    <div>
      <div className="row my-4">
                <h4>ALL BLOGS</h4>
                <div className="container">
                   <h5>{notes.length ===0 && 'No Notes To Display' }</h5> 
                </div>
                {notes && notes.map((note) => { // important to write notes && to avoid notes.map is not a function error
                    return <PublicNote key={note._id}  note={note} />
                })}
            </div>
    </div>
  )
}
