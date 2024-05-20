import axios from 'axios'
import React from 'react'

const UserSearchList = ({user, cont, userInfo, emailCheck, username, showReq, setEmailCheck}) => {

    const handleAddFriend = (user) => {
        axios.post(`http://localhost:5000/user/add-friend`, { senderDetails: userInfo, receiverDetails: user }).then((response) => {
            console.log("ADDED : ", response.data)
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
        <div className='absolute w-full'>
            <div className='w-full h-full rounded-md'>
                {username ? <div className='w-full h-full overflow-y-scroll mt-5'>
                    {user.map((user, index) => {
                        console.log('CONT : ', cont)
                        return <div className='w-full h-full flex items-center justify-between mt-1 p-2 cursor-pointer  max-xl:py-2 max-xl:p-0 max-xl:pr-1.5' key={index}>
                            <div className='flex items-center w-full'>
                                <img src={user.image} alt="" className='w-10 h-10 rounded-full' />
                                <div className='ml-2'>
                                    <h1 className='text-sm text-black dark:text-white'>{user.displayName}</h1>
                                    <p className='text-xs text-slate-700 dark:text-slate-400'>{user.email}</p>
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
        </div>
    )
}

export default UserSearchList