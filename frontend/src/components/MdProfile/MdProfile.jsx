import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { StatusContext } from '../../contexts/AuthContext'
import { ContactContext } from '../../contexts/ContactContext'
import getDate from '../../hooks/getDate'
import axios from 'axios'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const MdProfile = ({ setMdShowProfile, setMdProp }) => {

    const { userInfo } = useContext(UserInfoContext)
    const { status, setStatus } = useContext(StatusContext)
    const { contact } = useContext(ContactContext)

    const [contactCount, setContactCount] = useState(0)
    const [date, setDate] = useState('')

    useEffect(() => {
        axios.post('http://localhost:5000/user/contacts', { userId: userInfo._id }).then((response) => {
            setContactCount(response.data.contacts.length)
            setDate(getDate(userInfo.createdAt))
        })
    }, [userInfo])

    const HandleLogout = () => {
        axios.get('http://localhost:5000/auth/logout').then(() => {
            setStatus(false)
            document.cookie = `userData=;  Max-Age=-99999999;`;
            console.log("LOGOUT SUCCESSFUL.", status)
        })
    }

    return (
        <div className=''>
            <div className='w-full bg-transparent'>
                <div className='flex pl-4 pt-2'>
                    <button className='bg-emerald-900 dark:bg-slate-300 h-8 rounded-lg w-8' onClick={() => {
                        setMdShowProfile(false)
                        setMdProp(false)
                    }}><MdKeyboardArrowLeft size={30} className='fill-white dark:fill-black mx-auto' /></button>
                    <h2 className='font-thin text-2xl pl-3 text-emerald-800 dark:text-white'>Profile</h2>
                </div>
                <hr className='my-4 border-emerald-900 dark:border-slate-400' />
                <div className='w-full h-full flex items-center justify-between p-2 overflow-y-scroll mt-4 cursor-pointer'>
                    <div className='flex items-center h-full'>
                        <div className="avatar pl-2">
                            <div className="w-14 rounded-lg">
                                <img src={userInfo.image} />
                            </div>
                        </div>
                        <div className='ml-2 pl-3'>
                            <h1 className='text-xl text-gray-700 dark:text-white'>{userInfo.displayName}</h1>
                            <p className='text-md text-emerald-800 dark:text-emerald-500'>{userInfo.email}</p>
                        </div>
                    </div>
                </div>
                <div className='w-fit px-4 flex justify-center mt-6'>
                    <div className='shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-2 px-2'>
                        <h1 className='text-emerald-950 dark:text-white flex justify-center'>Total Contacts</h1>
                        <p className='text-emerald-950 dark:text-white flex justify-center'>{contactCount}</p>
                    </div>
                    <div className='mx-1'></div>
                    <div className='shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-2 px-4'>
                        <h1 className='text-emerald-950 dark:text-white flex justify-center'>Joined on</h1>
                        <p className='text-emerald-950 dark:text-white flex justify-center'>{date}</p>
                    </div>
                </div>
                <div className='relative flex bottom-0 justify-center mt-6 px-4'>
                    <button className='text-sm bg-red-700 bottom-0 w-full text-black font-semibold rounded-md px-4 py-2 hover:bg-red-800' onClick={HandleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default MdProfile
