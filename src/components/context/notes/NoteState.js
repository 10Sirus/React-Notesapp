import React, {useState}from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  // Define your state object
  const host="http://localhost:5000";
const notesInitial=
    [ 
        
      ]
const[notes,setNotes]=useState(notesInitial)

//get notes


const getNotes =async (title, description,tag)=>{
  
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
      },
   
  });
   

//logic 
const json=await response.json()
console.log(json)
setNotes(json)


}

//add note
const addNote=async (title, description,tag)=>{

  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
      },
   body: JSON.stringify({title,description,tag}), 
  });
  const note= await response.json();
  
setNotes(notes.concat(note));
}

//delete note
const deleteNote=async (id)=>{
  

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
      },
      
  });
  const json= response.json();
  console.log(json)
  
 
  console.log("deleted note with id"+ id)
const newNotes =notes.filter((note)=>{return note._id!==id})
setNotes(newNotes)
}
//edit note

const editNote=async (id, title,description,tag)=>{

  
  
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), 
  });
  const json=await response.json(); 
  console.log(json)
let newNotes= JSON.parse(JSON.stringify(notes))

for(let index=0; index<notes.length;index++){
  const element= notes[index];
  if(element._id===id){
   newNotes[index].title=title;
   newNotes[index].description=description;
   newNotes[index].tag=tag;
   break;  }

}
setNotes(newNotes);
}

          return  (
    
          <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
          </NoteContext.Provider>
                   );

};

export default NoteState;
