const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <>
      <li className="text-slate-950 my-5 border-2 border-slate-500 w-fit rounded p-1">
        {note.content}
        <button
          className="ml-5 bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-2 rounded"
          onClick={toggleImportance}
        >
          {label}
        </button>
      </li>
    </>
  )
}

export default Note
