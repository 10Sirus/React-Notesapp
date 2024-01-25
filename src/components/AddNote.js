import React, {useContext, useState } from 'react'
import NoteContext from './context/notes/NoteContext';

const AddNote = (props) => {
    const context=useContext(NoteContext);
    const{addNote}=context;

    const[note,setNote]=useState({title:"", description:"", tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag:"default"})
        props.showAlert("Added Successfull", "success");

    }
    const onChange=(e)=>{
       setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
       <div className="container my-3">
     <h1>Add Note</h1> 
   
     <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title"  name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange}  minLength={3} required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={3} required/>
  </div>
  
  <button  disabled={note.title.length<3||note.description.length<3}type="submit" className="btn btn-primary"  onClick={handleClick}>Add Note</button>
</form>
    


    </div>
    </div>
  )
}

export default AddNote
