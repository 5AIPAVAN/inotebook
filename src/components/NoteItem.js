import React,{useContext} from 'react'
import NoteContext from '../contexts/notes/noteContext';

export default function NoteItem(props) {
    const { note } = props;

    let items = useContext(NoteContext);
    const {deleteNote} = items;

    const deleteTheNote =(id)=>{
        deleteNote(id);
    }

    return (
        <div className="col-md-3">

            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex">
                    <i className="bi bi-pencil-square " onClick={props.UpdateNote}></i>
                    <i className="bi bi-trash3-fill mx-3" onClick={()=>{deleteTheNote(note._id)}}></i>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}
