import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='bg-black h-screen p-10    max-sm:p-7 max-lg:h-auto'>
      <h1 className='text-white text-6xl pt-4 peace-sans    max-sm:text-4xl'>About</h1>
      <div className='m-5     max-sm:w-full'>
        <p className='text-white text-xl creato-display-font font max-sm:text-base'>Introducing Connect, my passion project and the ultimate communication platform designed to streamline connections through Google Accounts. With Connect, I've created a seamless and intuitive way for users to communicate with friends, family, and colleagues using their email addresses. Gone are the days of juggling multiple messaging apps – Connect brings the simplicity and familiarity of email communication together with the immediacy of chatting. Whether you're sending a quick message or engaging in a lengthy conversation, Connect ensures that every interaction feels effortless and natural. As the creator of Connect, I've prioritized user experience, security, and privacy, ensuring that every aspect of the app reflects my commitment to excellence. Join me on this journey to revolutionize communication and experience the power of Connect firsthand.</p>
      </div>
      <div className='mt-12 mx-5' id='get-started'>
        <h1 className='text-4xl text-white peace-sans'>Get started</h1>
        <p className='text-white text-xl creato-display-font font max-sm:text-base mt-4'>Dive into a new era of communication with Connect – the ultimate platform for effortless connection via email IDs. Simplify your messaging experience by consolidating all your conversations in one intuitive interface. Whether you're catching up with friends or collaborating with colleagues, Connect ensures seamless interactions every step of the way. Join us on this journey to revolutionize communication – get started with Connect today and experience the difference firsthand.</p>
        <div className='flex mx-12 mt-2 justify-center'>
          <Link to={'/signup'}><button className='border-yellow-100 border-2 text-yellow-100 text-xl p-1 px-14 py-2 awelier font-bold tracking-widest rounded-xl mt-5   hover:bg-yellow-100 hover:text-black'>SIGNUP</button></Link>
        </div>
      </div>
    </div>
  )
}

export default About