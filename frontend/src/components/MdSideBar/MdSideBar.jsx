import axios from 'axios'
import React from 'react'
import { FaUser, FaUserFriends } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

const MdSideBar = ({setMdProp, setMdShowProfile, setMdShowSettings, setMdShowUserSearch, reqCount, setStatus, status}) => {

    const HandleLogout = () => {
        console.log("LOGOUT")
        axios.get('http://localhost:5000/auth/logout').then(() => {
            setStatus(false)
            document.cookie = `userData=;  Max-Age=-99999999;`;
            console.log("LOGOUT SUCCESSFUL.", status)
        })
    }

    return (
        <div className="dropdown dropdown-end absolute inset-y-0 right-0 flex items-center pr-2">
            <div tabIndex={0} role="button" className="m-1 "><IoReorderThreeOutline size={25} className='font-bold text-emerald-500 active:text-emerald-700' /></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 mt-44 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                <li onClick={() => {
                    setMdShowProfile(true)
                    setMdProp(true)
                    setMdShowSettings(false)
                    setMdShowUserSearch(false)
                }} className='text-white'><a><FaUser className='fill-white' />Profile</a></li>
                <li onClick={() => {
                    setMdShowUserSearch(true)
                    setMdProp(true)
                    setMdShowProfile(false)
                    setMdShowSettings(false)
                }} className='text-white'><a><FaUserFriends className='fill-white' />Add Friend {reqCount > 0 && <span className={` transition-all ease-in duration-700 inline-flex items-center justify-center rounded-full text-xs font-bold w-5 h-5 text-white bg-red-600 border-2 border-none  -end-2`}>{reqCount}</span>}</a>
                </li>
                <li onClick={() => {
                    setMdShowSettings(true)
                    setMdProp(true)
                    setMdShowProfile(false)
                    setMdShowUserSearch(false)
                }} className='text-white'><a><IoMdSettings className='fill-white' />Settings</a></li>
                <li onClick={HandleLogout} className='text-white'><a><MdLogout className='fill-white' />Logout</a></li>
            </ul>
        </div>
    )
}

export default MdSideBar
