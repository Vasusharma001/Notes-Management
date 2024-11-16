import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote(
      {
        title: "",
        description: "",
        tag: "",
      }
    );
    props.showAlert("Added note Successfully","success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className={`container my-4`} >
        <h2 className={`text-${props.mode==='light'? 'dark' : 'light'}`} >Add a Task</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className={`form-label text-${props.mode==='light'? 'dark' : 'light'}`}>
              Title
            </label>
            <input
              type="text"
              className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}
              id="title"
              name="title"
              onChange={onChange}
              aria-describedby="emailHelp"
              minLength={5}
              required
              value={note.title}            
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className={`form-label text-${props.mode==='light'? 'dark' : 'light'}`}>
              Description
            </label>
            <input
              type="text"
              className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className={`form-label text-${props.mode==='light'? 'dark' : 'light'}`}>
              Tag
            </label>
            <input
              type="text"
              className={`form-control text-${props.mode==='light'? 'dark' : 'light'} bg-${props.mode}`}
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required
              value={note.tag}
            />
          </div>
          <button
            disabled={note.title.length<5 || note.description.length<5 || note.description.tag<5}
            type="submit"
            className={`btn btn-${props.mode==='dark'? 'outline-light' : 'primary'}`}
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
