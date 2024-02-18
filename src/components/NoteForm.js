import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNewNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    })
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <h2 className="max-w-fit text-2xl font-bold mx-auto">
        Create a new note
      </h2>

      <form
        className="max-w-xl mx-auto mt-4 bg-white p-4 rounded"
        onSubmit={addNewNote}
      >
        <input
          value={newNote}
          placeholder="Enter a new note"
          className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-300"
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          type="submit"
        >
          save
        </button>
      </form>
    </div>
  )
}

export default NoteForm
