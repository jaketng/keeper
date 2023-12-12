import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import { notes as notesData } from "../notes";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(notesData);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function addNote(event) {
    event.preventDefault();
    const newNote = {
      key: notes.length + 1,
      title: title,
      content: content
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  }

  function deleteNote(key) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.key !== key));
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
          key={note.key}
          title={note.title}
          content={note.content}
          onDelete={() => deleteNote(note.key)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
