const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors()); 
app.use(bodyParser.json());

uri = 'mongodb+srv://jakepb02:Andover101@testcluster.d03ektu.mongodb.net/?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}

connect();

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
  });
  
const Note = mongoose.model("Note", noteSchema);

app.post("/api/postData", async (req, res) => {
    console.log("req received");
    const data = req.body;
  
    const newNote = new Note(data);
    try {
      const result = await newNote.save();
      res.json(result);
    } catch (error) {
      res.send(error);
    }
  });
  
app.get("/api/postData", async (req, res) => {
try {
    const notes = await Note.find();
    res.json(notes);
} catch (error) {
    res.send(error);
}
});

app.delete("/api/postData/:id", async (req, res) => {
const id = req.params.id;
try {
    const result = await Note.findByIdAndDelete(id);
    res.json(result);
} catch (error) {
    res.send(error);
}
});

const PORT = 5001; 

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});