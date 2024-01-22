import React,{useContext,useState} from 'react'
import NoteContext from '../contexts/notes/noteContext'

export default function AddNote() {

    let items = useContext(NoteContext);
    const {addNote} = items;

    const [note,setNote]=useState({title:"",description:"",tag:""});
 const handleAddNote =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""}); // to clear the form with entered values once submitted
    }
   

    const onnnChange =(e)=>{
         setNote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div>

            <h3> ADD A NOTE </h3>
            <form className="my-2">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} name="title" id="title" aria-describedby="emailHelp" onChange={onnnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} name="description" id="description" onChange={onnnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} name="tag" id="tag" onChange={onnnChange} />
                </div>
                <button type="submit" disabled={note.title.length <5 || note.description.length <5 } className="btn btn-primary" onClick={handleAddNote}>AddNote</button>
            </form>

        </div>
    )
}
