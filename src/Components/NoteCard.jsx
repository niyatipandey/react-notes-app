import React from 'react'
import { Pin } from 'lucide-react'

const NoteCard = ({elem,deleteNote,EditNote,pinNote,darkMode}) => {
  return (
        <div className="flex gap-2 flex-col items-start relative bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] bg-cover h-56 w-full sm:w-48 rounded-2xl pt-9 py-9 px-4 text-black mt-4">
          <div className='flex justify-between w-full'>
            <h3 className='leading-tight text-lg font-bold'>{elem.title}</h3>
            <Pin size={16} strokeWidth={1.5} onClick={()=>{
              pinNote(elem.id)
            }} className={elem.pinned ? 'cursor-pointer fill-yellow-400': 'cursor-pointer'}/>
        </div>
            <p className='leading-tight font-semibold text-gray-700 text-xs'> {elem.text}</p>
            <div className='flex flex-col w-full mt-auto h-full'>
            <div className='flex flex-col w-full mt-auto'>
        <div className='flex gap-2'>
          <button
            onClick={() => {
              EditNote(elem.id)
            }}
            className='flex-1 text-white bg-green-500 py-2 text-xs cursor-pointer rounded-lg font-bold active:scale-95 hover:brightness-110
transition-all'
          >
            ✏ Edit
          </button>
          <button
            onClick={() => {
              deleteNote(elem.id)
            }}
            className='flex-1 text-white bg-red-500 py-2 text-xs cursor-pointer rounded-lg font-bold active:scale-95 hover:brightness-110
transition-all'
          >Delete</button>
        </div>
        <p className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-700'} mt-2 w-full text-center font-medium`}>{elem.createdAt}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteCard