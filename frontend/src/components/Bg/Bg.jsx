import React from 'react'
import './Bg.css'

function Bg() {
  
  return (
    <div className='h-auto w-full bg-cover bg-center bg-img text-center pb-10'>
      <div className='h-fit w-full'>
        <h1 className='pt-20 inset-0 text-yellow-100 text-8xl peace-sans max-sm:text-5xl uppercase'>connect</h1>
        <p className='mt-5 text-yellow-100 font-thin text-3xl adelia-font'>Say it with connect.</p>
        <a href="#get-started"><button className='rounded-xl border-2 p-2 px-4 text-xl my-36 border-yellow-100 awelier text-yellow-100 hover:bg-yellow-100 hover:text-slate-800'>Get started</button></a> 
      </div>
    </div>
  )
}

export default Bg