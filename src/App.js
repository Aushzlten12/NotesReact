import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('loggin in with ', username, password)
    setUsername('')
    setPassword('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-5xl to-zinc-900">Notes</h1>
      </div>
      <Notification message={errorMessage} />
      <form
        onSubmit={handleLogin}
        className="max-w-xs mx-auto mt-8 bg-gray-100 p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            name="Username"
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            name="Password"
            className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none active:bg-indigo-800"
        >
          Login
        </button>
      </form>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-20"
        onClick={() => setShowAll(!showAll)}
      >
        show {showAll ? 'important' : 'all'}
      </button>
      <ul className="ml-20">
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form className="ml-20 w-fit flex space-x-4" onSubmit={addNote}>
        <input
          className="border rounded py-2 px4"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          save
        </button>
      </form>
      <Footer />
    </>
  )
}

export default App
