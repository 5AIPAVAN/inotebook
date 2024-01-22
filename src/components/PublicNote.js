import React,{useContext} from 'react'
import NoteContext from '../contexts/notes/noteContext';

export default function NoteItem(props) {
    const { note } = props;

    let items = useContext(NoteContext);
  

    return (
        <div className="col-md-3">

            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
  
                    
                </div>
            </div>

        </div>
    )
}
