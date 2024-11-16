//We are using express for out backend
const express = require("express");

//Since notes is a route which means it is a pathway used to make our index js more modular
const router = express.Router();

//It is a model which gives shape to the data entered by enforcing some constraints
const Notes = require("../models/Note");

//Module named fetchuser which is a middleware acts as a middleman to retrive user data from token which is taken from the user after login
var fetchuser = require("../middleware/fetchuser");

//ROUTE 1
//Fetch all notes for a particular user using: GET "/api/notes/fetchallnotes" Login Required (sign up in layman)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    //retrieve all notes of a particular user
    const notes = await Notes.find({ user: req.user.id });
    //send that notes array to user as response
    res.json(notes);
  } catch (error) {
    //Since any kind of random error can occur apart from wrong fields filled by user it will help to notify that
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//We need to validate whether we got new note in right format or not!
const { body, validationResult } = require("express-validator");

//ROUTE 2
//Add a new note for a particular user using: POST "/api/notes/addnote" Login Required (sign up in layman)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors, return BAD request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      //send that notes array to user as response
      res.json(savedNote);
    } catch (error) {
      //Since any kind of random error can occur apart from wrong fields filled by user it will help to notify that
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 3
//Update note for a particular user using: PUT "/api/notes/updatenote" Login Required (sign up in layman)
//We may use post request here also but conventionally put request is used
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
      const {title,description,tag} = await req.body;
      //Create a new note object 
      const newNote={};
      if(title){newNote.title=title};
      if(description){newNote.description=description};
      if(tag){newNote.tag=tag};
      //Find the note to be updated and update it
      let note=await Notes.findById(req.params.id);
      if(!note){return res.status(404).send("Not Found");}
      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}
      note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true})
      res.json({note});
    }
    );
    
    //ROUTE 4
    //Delete note for a particular user using: DELETE "/api/notes/updatenote" Login Required (sign up in layman)
    router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    //Find the note to be deleted and delete it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found");}
    
    //Allow deletion only if user own this note
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"note has been deleted",note:note}); 
  }
);
module.exports = router;
