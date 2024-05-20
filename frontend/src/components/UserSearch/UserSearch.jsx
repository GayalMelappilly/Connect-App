import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext';
import FriendReq from '../FriendReq/FriendReq';
import UserSearchList from '../UserSearchList/UserSearchList';

const UserSearch = () => {

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

    return (
        <div className='absolute w-11/12'>
            <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <CiSearch size={20} className='fill-emerald-900 dark:fill-slate-500' />
                    </button>
                </span>
                <input type="search" name="q" className="py-2 text-sm text-emerald-900 dark:text-white bg-transparent opacity-80 rounded-md pl-10 focus:outline-none placeholder-marquee placeholder:text-emerald-900 placeholder:opacity-80 dark:placeholder:text-slate-400" placeholder="Search for user" autoComplete="off" value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <hr />
            <button className='btn btn-sm mt-2 btn-outline text-emerald-900 opacity-90 dark:text-slate-300 hover:bg-emerald-700 dark:hover:bg-slate-300 hover:border-none hover:text-white dark:hover:text-black' onClick={() => setShowReq(!showReq)}>{showReq ? 'Hide' : 'Friend Requests'}</button>
            {showReq && friendReq && <div>
                {friendReq.incomingRequests.map((user) => {
                    return <FriendReq
                        user={user}
                        userInfo={userInfo}
                        setContact={setContact}
                        setFriendReq={setFriendReq}
                        friendReq={friendReq}
                    />
                })}
                {showReq && !friendReq &&
                    <div>
                        <p className='text-emerald-900 dark:text-white'>No reqs yet!</p>
                    </div>
                }
            </div>}
            {user &&  
            <UserSearchList
                user={user}
                cont={cont}
                userInfo={userInfo}
                emailCheck={emailCheck}
                username={username}
                showReq={showReq}
                setEmailCheck={setEmailCheck}
            />}
        </div>
    )
}

export default UserSearch
