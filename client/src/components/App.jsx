import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:5001/api/postData");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function addNote(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }
    const newNote = {
      title: title,
      content: content,
    };

    try {
      await axios.post("http://localhost:5001/api/postData", newNote);
      fetchData();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5001/api/postData/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={handleContentChange}
        />
        <button type="submit">Add</button>
      </form>
      {notes.map((note) => (
        <Note
          key={note._id}
          title={note.title}
          content={note.content}
          onDelete={() => deleteNote(note._id)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
