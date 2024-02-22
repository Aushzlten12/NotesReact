const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <>
      <li className="note flex items-center justify-between my-3 tablet:my-0 text-slate-950 border-2 border-slate-500 max-w-full py-2  px-3 rounded">
        <span>{note.content}</span>
        <button
          className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-1 px-2 rounded"
          onClick={toggleImportance}
        >
          {label}
        </button>
      </li>
    </>
  )
}

export default Note
