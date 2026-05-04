import React from 'react'
import NoteCard from './NoteCard';

const NoteList = ({task,deleteNote,EditNote,pinNote, darkMode}) => {
  return (
    <div className='flex flex-wrap items-start justify-start gap-5'>
        {task.map(function (elem){
        return <NoteCard key={elem.id} elem={elem} deleteNote={deleteNote} EditNote={EditNote} pinNote={pinNote} darkMode={darkMode}/>
        })}
    </div>
  )
}

export default NoteList