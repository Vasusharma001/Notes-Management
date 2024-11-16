import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_host;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all note
  const getNotes = async() => {
    // TO DO :: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        //Since Auth token is/was hard coded that led to issues
        //We are going to store the auth token in the local storage
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
  };
  //Add a note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json=await response.json();
    console.log(json);
    console.log(`Deleting a note of id :: ${id}`);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes); 
    const json=await response.json();
    console.log(json);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote}}>
      {props.children} 
    </NoteContext.Provider>
  );
};

export default NoteState;
