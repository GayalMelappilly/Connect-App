import React from 'react'
import './Home.css'
import Contacts from '../../components/Contacts/Contacts.jsx';
import Message from '../../components/Message/Message.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';


function Home() {

    return (
        <div className="dark:bg-[#1B1E1C] bg-emerald-200 flex h-screen bg-cover bg-center w-full items-center justify-center px-32 py-10   max-md:px-4 max-md:py-4   max-lg:py-5   max-xl:px-12">
            <div className="w-full h-5/6 overflow-hidden rounded-lg backdrop-blur-sm md:flex max-md:backdrop-blur-none       max-md:h-full">
                <Contacts />
                <Message />
                <Sidebar />
            </div>
        </div>
    )
}

export default Home