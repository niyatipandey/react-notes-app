import React from 'react'

const NoteForm = ({title,text,setTitle,setText,edit,darkMode}) => {

  return (
    <div>
        <h1 className='text-3xl font-bold mb-4'>{edit ? '✏ Edit Note' : '📝 Create Note'}</h1>
        {/*first input*/}
        <input type="text"
        value={title}
        onChange={(e)=>{
        setTitle(e.target.value)
        }}
        placeholder='Enter Notes Heading'
        className={`px-5 w-full py-2 border-2 rounded-xl font-medium outline-none mt-3
        ${darkMode
          ? 'bg-black text-white border-zinc-700'
          : 'bg-white text-black border-zinc-400'}
        `}
        />
        {/*second detailed input*/}
        <textarea type="text" 
        placeholder='Write Details Here'
        value={text}
        onChange={(e)=>{
        setText(e.target.value)
        }}
        className={`px-5 w-full h-32 py-2 border-2 rounded font-medium outline-none mt-3
        ${darkMode
          ? 'bg-black text-white border-zinc-700'
          : 'bg-white text-black border-zinc-400'}
        `}
        />
        {edit !== null ? (
          <button className={`w-full px-5 py-2 rounded-xl outline-none font-medium mt-3
          ${darkMode
            ? 'bg-white text-black'
            : 'bg-zinc-900 text-white'}
          `}>
            Update Note
          </button>
        ) : (
          <button className={`w-full px-5 py-2 rounded-xl outline-none font-medium mt-3
          ${darkMode
            ? 'bg-white text-black'
            : 'bg-zinc-900 text-white'}
          `}>
            Add Note
          </button>
        )}
</div>
)
}

export default NoteForm