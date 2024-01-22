import React,{useContext,useState,useRef } from 'react'
//import NoteContext from '../contexts/notes/noteContext';

export default function AccountItem(props) {
    const { note } = props;

    const [Edit_note, setEdit_Note] = useState({edit_id:"", edit_title: "", edit_description: "", edit_tag: "" });

    
    const ref = useRef(null);
    

    const UpdateNote = (Currentnote) => {
        ref.current.click();
       // setEdit_Note(Currentnote)// inorder to copy values of Currentnote to Edit_Note 
                                // -> attributes must be with same names
                                // -> title,description,tag in both Currentnote,Edit_Note

       setEdit_Note({ edit_id:Currentnote._id,
                     edit_title:Currentnote.title,
                     edit_description:Currentnote.description,
                     edit_tag:Currentnote.tag});     // when Currentnote,Edit_Note has different attributes    
                     
    

    }

    // console.log(Edit_note);

    const onnnChange = (e) => {
        setEdit_Note({ ...Edit_note, [e.target.name]: e.target.value });
    
        
    }
    const Close_ref = useRef(null);

    const handleSaveChanges=(e)=>{
     console.log("Updating note.....");
     e.preventDefault();
   // editNote(Edit_note.edit_id,Edit_note.edit_title,Edit_note.edit_description,Edit_note.edit_tag);
    Close_ref.current.click();
          
    }


    return (
        <div className="col-md-3">
             <div className="container">

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form className="my-2">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={Edit_note.edit_title} className="form-control" name="edit_title" id="edit_title" aria-describedby="emailHelp" onChange={onnnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={Edit_note.edit_description} className="form-control" name="edit_description" id="edit_description" onChange={onnnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={Edit_note.edit_tag} className="form-control" name="edit_tag" id="edit_tag" onChange={onnnChange} />
                    </div>

                </form>
            </div>
            <div className="modal-footer">
                <button type="button" ref={Close_ref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" disabled={Edit_note.edit_title.length <5 || Edit_note.edit_description.length <5 } onClick={handleSaveChanges} className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</div>

            <div className="card my-3">
                <div className="card-body">
                <center>
                    <h4 className="card-title">{note.title}</h4>
                    <p className="card-text">{note.description}</p>
                    <h5 style={{color:'red'}} className="card-text">BALANCE :{note.tag}</h5>
                   <button type="button" class="btn btn-primary">View Account</button>
                   </center> 
                </div>
            </div>

        </div>
    )
}
