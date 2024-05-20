import React from 'react'
import { IoIosCheckmark, IoIosClose } from 'react-icons/io'

const FriendReq = ({user, userInfo, setContact, setFriendReq, friendReq}) => {

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

    return (
        <div className='w-full h-full flex items-center justify-between p-2 mt-2' key={user._id}>
            <div className='flex items-center'>
                <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                <div className='ml-2'>
                    <h1 className='text-sm text-black dark:text-white'>{user.displayName}</h1>
                    <p className='text-xs text-emerald-500'>{user.email}</p>
                </div>
                <div className={` ${friendReq ? 'cursor-pointer' : 'pointer-events-none'} ml-5`}>
                    <IoIosCheckmark size={20} className='btn h-2 btn-sm btn-square btn-ghost border-slate-400 rounded-xl text-emerald-500   hover:bg-emerald-500 hover:text-black' onClick={() => handleAccept(user)} />
                    <IoIosClose size={20} className='btn btn-sm btn-square btn-ghost border-slate-400 rounded-xl ml-2 text-red-700   hover:bg-red-700 hover:text-black' onClick={() => handleDecline(user)} />
                </div>
            </div>
        </div>
    )
}

export default FriendReq