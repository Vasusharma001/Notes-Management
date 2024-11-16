var cors=require('cors');
require("dotenv").config();
const connectToMongo=require('./db');
connectToMongo();
//used for config env
const express = require('express')
//Cors must be installed by npm i cors and use line 4 to import and use line 10 to use it
//It basically helps in with fetching errors

const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`NotesNation backend listening at http://localhost:${port}`)
})