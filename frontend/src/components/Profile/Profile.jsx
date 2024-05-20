import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { StatusContext } from '../../contexts/AuthContext'
import { ContactContext } from '../../contexts/ContactContext'
import getDate from '../../hooks/getDate'
import axios from 'axios'

const Profile = () => {

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
        <div className='absolute'>
            <div className='w-full bg-transparent'>
                <div className='w-full h-full overflow-y-scroll mt-5'>
                    <div className='w-full h-full flex items-center justify-between p-2 mt-2 cursor-pointer'>
                        <div className='flex items-center'>
                            <div className="avatar">
                                <div className="w-14 rounded-lg">
                                    <img src={userInfo.image} />
                                </div>
                            </div>
                            <div className='ml-2 pl-3'>
                                <h1 className='text-xl text-gray-700 dark:text-white'>{userInfo.displayName}</h1>
                                <p className='text-md text-emerald-800 dark:text-emerald-500'>{userInfo.email}</p>
                            </div>
                        </div>
                        {/* <div className='flex items-center'>
                                <button className='text-sm bg-blue-500 text-white rounded-md px-2 py-1'>View</button>
                            </div> */}
                    </div>
                </div>
                <hr className='my-5 opacity-50'/>
                <div className='w-fit flex justify-center'>
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
                <hr className='my-5 opacity-50'/>
                <div className='relative flex bottom-0 justify-center'>
                    <button className='text-sm bg-red-500 dark:bg-red-700 bottom-0 w-full text-black font-semibold rounded-md px-4 py-2 hover:bg-red-800' onClick={HandleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
