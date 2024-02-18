import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userCredentials = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(userCredentials)
      )

      noteService.setToken(userCredentials.token)
      setUser(userCredentials)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedObject) => {
      setNotes(notes.concat(returnedObject))
    })
  }

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="text-center">
          <h1 className="text-5xl to-zinc-900">Notes</h1>
        </div>
        <Notification message={errorMessage} />
        {user === null ? (
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              setUsername={setUsername}
              username={username}
              setPassword={setPassword}
              password={password}
            />
          </Togglable>
        ) : (
          <div>
            <p className="text-2xl">
              {' '}
              <span className=" font-bold px-4">{user.name}</span> logged-in
            </p>
            {noteForm()}
          </div>
        )}
        <button
          className="mb-3 bg-blue-500 hover:bg-blue-700 self-start text-white font-bold py-2 px-4 rounded mx-2"
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? 'important' : 'all'}
        </button>
        <ul className="mx-2">
          <div className="tablet:grid tablet:grid-cols-2 tablet:gap-3 laptop:grid-cols-3 desktop:grid-cols-4">
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
              />
            ))}
          </div>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App
