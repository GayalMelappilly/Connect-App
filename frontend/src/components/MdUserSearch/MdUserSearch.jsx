import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const MdUserSearch = ({ setMdShowUserSearch, setMdProp }) => {

    const [username, setUsername] = useState('')
    const [friendReq, setFriendReq] = useState(null)
    const [showReq, setShowReq] = useState(false)
    const [user, setUser] = useState([])
    const [cont, setCont] = useState([])
    const [emailCheck, setEmailCheck] = useState(true)

    const { userInfo } = useContext(UserInfoContext)
    const { setContact } = useContext(ContactContext)

    useEffect(() => {
        console.log("USER : ", userInfo)
        axios.post('http://localhost:5000/user/contacts', { userId: userInfo._id }).then((response) => {
            console.log("SET CONT : ", response.data.contacts)
            setCont(response.data.contacts)
        })
    }, [userInfo])

    useEffect(() => {
        axios.get(`http://localhost:5000/user/list?search=${username}&id=${userInfo._id}`).then((response) => {
            console.log("CONT : ", cont)
            setUser(response.data)
            setEmailCheck(true)
        })
    }, [username])

    useEffect(() => {
        axios.get(`http://localhost:5000/user/request-list?id=${userInfo._id}`).then((response) => {
            setFriendReq(response.data)
        })
    }, [])

    const handleAddFriend = (user) => {
        axios.post(`http://localhost:5000/user/add-friend`, { senderDetails: userInfo, receiverDetails: user }).then((response) => {
            console.log("ADDED : ", response.data)
        })
    }

    const handleAccept = (user) => {
        axios.put('http://localhost:5000/user/req-accept', { reqFrom: user, reqTo: userInfo }).then((response) => {
            setContact(response.data.contacts)
            setFriendReq(response.data)
        })
    }

    const handleDecline = (user) => {
        axios.put('http://localhost:5000/user/req-decline', { reqFrom: user, reqTo: userInfo }).then((response) => {
            console.log("DECLINED : ", response.data)
            setFriendReq(response.data)
        })
    }

    const handleInvite = (username) => {
        console.log('USERNAME ', username)
        if (username.includes('@gmail.com')) {
            setEmailCheck(true)
            axios.post('http://localhost:5000/user/invite-user', { email: username, user: userInfo }).then((response) => {
                console.log("INVITE SUCCESSFULLY : ", response.data)
            })
        } else {
            setEmailCheck(false)
        }
    }

    return (
        <div className='absolute w-10/12 px-5 pt-2   max-lg:px-1'>
            <div className='flex pl-2  max-lg:pl-0'>
                <div className='absolute -mx-6   max-lg:mx-0'>
                    <button className='bg-emerald-900 dark:bg-slate-300 h-8 rounded-lg w-8' onClick={() => {
                        setMdShowUserSearch(false)
                        setMdProp(false)
                    }}><MdKeyboardArrowLeft size={30} className='fill-white dark:fill-black mx-auto' /></button>
                </div>
                <div className="relative text-gray-600 focus-within:text-gray-400 ml-2 mb-1   max-lg:ml-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <CiSearch size={20} className='fill-emerald-900 dark:fill-slate-500' />
                        </button>
                    </span>
                    <input type="search" name="q" className="py-2 text-sm text-emerald-900 dark:text-white bg-transparent opacity-80 rounded-md pl-10 focus:outline-none placeholder-marquee placeholder:text-emerald-900 placeholder:opacity-80 dark:placeholder:text-slate-400" placeholder="Search for user" autoComplete="off" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </div>
            </div>
            <hr className='border-emerald-900 dark:border-slate-400' />
            <button className='btn btn-sm mt-2 btn-outline text-emerald-900 opacity-90 dark:text-slate-300 hover:bg-emerald-700 hover:border-none hover:text-white dark:hover:text-black' onClick={() => setShowReq(!showReq)}>{showReq ? 'Hide' : 'Friend Requests'}</button>
            {showReq && friendReq && <div>
                {friendReq.incomingRequests.map((user, index) => {
                    return <div className='w-full h-full flex items-center justify-between p-2 mt-2' key={index}>
                        <div className='flex items-center'>
                            <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                            <div className='ml-2'>
                                <h1 className='text-sm text-black dark:text-white'>{user.displayName}</h1>
                                <p className='text-xs text-emerald-500'>{user.email}</p>
                            </div>
                            <div className={` ${friendReq ? 'cursor-pointer' : 'pointer-events-none'} flex ml-5`}>
                                <IoIosCheckmark size={20} className='btn h-2 btn-sm btn-square btn-ghost border-slate-400 rounded-xl text-emerald-500   hover:bg-emerald-500 hover:text-black' onClick={() => handleAccept(user)} />
                                <IoIosClose size={20} className='btn btn-sm btn-square btn-ghost border-slate-400 rounded-xl ml-2 text-red-700   hover:bg-red-700 hover:text-black' onClick={() => handleDecline(user)} />
                            </div>
                        </div>
                    </div>
                })}
                {showReq && !friendReq &&
                    <div>
                        <p className='text-emerald-900 dark:text-white'>No reqs yet!</p>
                    </div>
                }
            </div>}
            {user && <div className='absolute w-full'>
                <div className='w-full h-fullrounded-md'>
                    {username ? <div className='w-full h-full overflow-y-scroll mt-5'>
                        {user.map((user, index) => {
                            console.log('CONT : ', cont)
                            return <div className='w-full h-full flex items-center justify-between p-2 cursor-pointer  max-lg:py-2 max-lg:p-0' key={index}>
                                <div className='flex items-center w-full'>
                                    <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                                    <div className='ml-2'>
                                        <h1 className='text-sm text-black dark:text-white'>{user.displayName}</h1>
                                        <p className='text-xs text-slate-700'>{user.email}</p>
                                    </div>
                                </div>
                                {cont.some(users => users._id === user._id) ?
                                    <p className='text-emerald-900 dark:text-emerald-500 italic opacity-70'>Added</p>
                                    :
                                    <button className='btn end-0 btn-outline btn-sm border-emerald-600 text-emerald-600 hover:border-emerald-500 hover:bg-emerald-500  dark:border-emerald-500 dark:text-emerald-500 ml-5 dark:hover:border-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-black' onClick={() => handleAddFriend(user)}>ADD</button>
                                }
                            </div>
                        })}
                        {user.length === 0 && <div>
                            <p className='flex justify-center text-neutral-content'>User does not exist</p>
                            {emailCheck ? null : <p className='flex justify-center mt-2 text-red-400'>Invalid gmail address</p>}
                            <div className='flex justify-center'>
                                <button className='flex justify-center bg-emerald-500 text-black hover:bg-emerald-700 btn btn-sm w-3/6 rounded-md mt-5' onClick={() => handleInvite(username)}>Invite Friend</button>
                            </div>
                        </div>}
                    </div>
                        :
                        <div className='flex justify-center mt-5'>
                            {!showReq && <p className='text-emerald-900 opacity-70 dark:text-neutral-content'>Search for a user</p>}
                        </div>}
                </div>
            </div>}
        </div>
    )
}

export default MdUserSearch
