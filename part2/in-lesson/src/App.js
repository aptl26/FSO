import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes.js'
import Notification from './components/Notification'

const App = () => {
  const [ notesArr, setNotesArr ] = useState([])
  const [ newNote, setNewNote ] = useState("")
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    noteService  
      .getAll()
      .then(initialNotes => {
        setNotesArr(initialNotes)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const note = notesArr.find(note => note.id === id)
    const newNote = { ...note, important: !note.important }

    noteService
      .update(id, newNote)
      .then(returnedNote => {
        setNotesArr(notesArr.map(note => 
          note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(`The note ${note.content} was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotesArr(notesArr.filter(note => note.id !== id))
      })
  }

  const addNote = (e) => {
    e.preventDefault()
    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    noteService
      .create(note)
      .then(returnedNote => {
        setNotesArr([ ...notesArr, returnedNote ])
        setNewNote("")
      })
  }


  const notesToShow = showAll ? notesArr : notesArr.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important only" : "all"}
      </button>
    </div>
  )
}

export default App