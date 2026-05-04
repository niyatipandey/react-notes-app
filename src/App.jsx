import React, { useEffect, useState } from 'react'
import NoteForm from './Components/NoteForm';
import NoteList from './Components/NoteList';
import EmptyCheck from './Components/EmptyCheck';

const App = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [edit, setEdit] = useState(null)
  const [showTrash, setShowTrash] = useState(false)
  const [toast, setToast] = useState('')
  const [darkMode, setDarkMode] = useState(false)


  const [task, setTask] = useState(()=>{
    const savedNotes = JSON.parse(localStorage.getItem('notes'))

    return savedNotes || [];
  })

  const submitHandler = (e)=>{
    e.preventDefault()
    
    const copyTask = [...task]

    const idx = task.findIndex((note)=>{
      return note.id === edit
    })

    if(edit !== null){
      copyTask[idx] = { id: copyTask[idx].id, title,text,pinned: copyTask[idx].pinned , createdAt: copyTask[idx].createdAt, trashed: copyTask[idx].trashed}
      setEdit(null)
      setToast('Note Updated ✏')
    }else{
      copyTask.push({id:Date.now() ,title,text,pinned: false , createdAt: new Date().toLocaleString(),trashed:false})
      setToast('Note Added ✅')
    }
    setTask(copyTask)

    setTitle('')
    setText('')
  }

  const deleteNote = (id)=>{
    const copyTask = [...task]
    const idx = task.findIndex((note)=>{
      return note.id === id;
    })
    copyTask[idx].trashed = true;
    setTask(copyTask) 
    setToast('Moved to Trash 🗑')
  }

  const EditNote = (id)=>{
    const selectedNote = task.find((note)=>{
      return note.id === id
    })
    setTitle(selectedNote.title)
    setText(selectedNote.text)
    setEdit(id)

  }

  useEffect(() => {
      localStorage.setItem('notes',JSON.stringify(task))
  }, [task])
  
  const filteredTask = task.filter((note)=>{
    return (note.title.toLowerCase().includes(search.toLowerCase()) && note.trashed === false);
  })

  const sortedTask = [...filteredTask].sort((a,b)=>{
    return b.pinned - a.pinned; // 1 means true 0 means false
  })

  const pinNote=(id)=>{
    const copyTask = [...task];

    const idx = task.findIndex((note)=>{
      return note.id === id;
    })

    copyTask[idx].pinned = !copyTask[idx].pinned;
    setTask(copyTask)
    setToast('Note Pinned 📌')
  }

  const trashedNotes = task.filter((note)=>{
    return (note.title.toLowerCase().includes(search.toLowerCase()) && 
    note.trashed === true);
  })

  useEffect(() => {
    if(toast !== ''){
      setTimeout(() => { //to create timer once and do the job and close it
        setToast('')
      }, 2000);
    }
  }, [toast])
  

  return (
    <>
    {toast !== '' ? <div className='fixed bottom-5 right-5 bg-white text-black px-4 py-2 rounded-xl border-2 border-amber-300 shadow-xl font-semibold text-sm z-50'>
      {toast}
    </div> : null}
    <div className={`min-h-screen lg:flex ${ darkMode ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-black'}`}>
      <button
        onClick={()=>{
          setDarkMode(!darkMode)
        }} className={`fixed top-5 right-5 px-4 py-2 rounded-lg font-medium shadow
          ${darkMode
            ? 'bg-zinc-800 text-white'
            : 'bg-white text-black'}
          `}>
          {darkMode === true ? '☀ Light' : '🌙 Dark'}
      </button>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} className='flex items-start gap-4 flex-col p-4 sm:p-6 lg:p-10 lg:w-1/2'>
        <NoteForm title={title} text={text} setTitle={setTitle} setText={setText} edit={edit} darkMode={darkMode} />
      </form>
      <div className={`lg:w-1/2 ${darkMode ? 'lg:border-l-2  border-zinc-700' : 'lg:border-l-2 border-zinc-400'} p-4 sm:p-6 lg:p-10`}>
        {(task.length===0) ? ( <EmptyCheck /> ) : <>
        <h1 className='text-3xl font-bold'>📌 Recent Notes</h1>
        <div className='flex w-full gap-6'>
          <input type="text"
          className={`p-3 mt-4 w-3/4 rounded outline border ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black border-zinc-400'}`}
          placeholder='Search Notes here'
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)
          }} />
          <button
            onClick={() => {
              setShowTrash(!showTrash)
            }}
            className={`w-1/4 mt-4 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer active:scale-95 border hover:scale-105 transition-all
            ${darkMode
              ? 'bg-zinc-800 text-white border-white'
              : 'bg-white text-black border-zinc-400'}
            `}>
            {showTrash ? '📝 Back to Notes' : '🗑 View Trash'}
          </button>
        </div>
        <div id='notes' className='flex flex-wrap items-start justify-start gap-5 mt-5 overflow-auto h-[90%]'>
          <NoteList task={showTrash ? trashedNotes : sortedTask} deleteNote={deleteNote} EditNote={EditNote} pinNote={pinNote} darkMode={darkMode}/>
        </div>
        </>
      }
      </div>

    </div>
    </>
  )
}

export default App
