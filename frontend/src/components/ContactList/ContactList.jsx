import axios from 'axios'
import React from 'react'
import { IoIosRemoveCircle } from 'react-icons/io'
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi'

const ContactList = ({ contact, selection, onlineUsers, userToRemove, userInfo, setAllContacts, setSelection, setUserToRemove, setMessageInfo, setMdContactBar }) => {

    const handleClick = (index, contact) => {
        setSelection(contact._id);
        setMdContactBar(contact);
        console.log("CLICKED ", contact)
        axios.post('http://localhost:5000/message/get/', { senderId: userInfo._id, receiverId: contact._id }).then((response) => {
            if (response) {
                const receiverInfo = {
                    _id: contact._id,
                    name: contact.displayName,
                    email: contact.email,
                    image: contact.image,
                    messages: response.data?.messages
                }
                console.log("RECEIVER INFO ", receiverInfo)
                if (receiverInfo) {
                    setMessageInfo(receiverInfo)
                    console.log("UPDATED INFO")
                }
            }
        })
    }

    const HandleRemoveFriend = (contact, userInfo) => {
        console.log('HANDLE REMOVE FRIEND : HandleRemoveFriend', contact)
        axios.put('http://localhost:5000/user/remove-friend', { details: contact, user: userInfo }).then((response) => {
            console.log("CONTACT FROM REMOVED : ", response.data)
            setAllContacts(response.data.contacts)
            setSelection(null)
        })
    }

    const HandleSetUserToRemove = (details) => {
        console.log("CLICKED! HandleSetUserToRemove")
        setUserToRemove(details)
        document.getElementById('my_modal_2').showModal()
    }

    return (
        <div className={`w-full group h-full flex items-center cursor-pointer justify-between p-2 mt-2 hover:bg-slate-400 hover:bg-opacity-20 rounded-lg ${selection === contact._id ? 'bg-slate-600 bg-opacity-20' : ''}`} key={contact._id} onClick={() => handleClick(contact._id, contact)} >
            <label className='flex items-center'>
                <div className='relative flex flex-col'>
                    <img src={contact.image} alt="" className='min-w-10 max-w-10 max-h-10 min-h-10 rounded-full' />
                    {onlineUsers.includes(contact._id) && <div className={`absolute inline-flex items-center justify-center w-2 h-2 text-xs font-bold text-white bg-green-500 border-2 border-none rounded-full`} key={contact._id}></div>}
                </div>
                <div className='ml-2'>
                    <h1 className='text-sm text-[#1B1E1C] dark:text-white'>{contact.displayName}</h1>
                    <p className='text-xs text-[#1B1E1C] dark:text-slate-400'>{contact.email}</p>
                </div>
            </label>


            <div className={`${selection === contact._id ? 'opacity-100' : 'opacity-0'} dropdown dropdown-end inset-y-0`}>
                <div tabIndex={0} role="button" className="m-1"><PiDotsThreeOutlineVerticalBold className='fill-zinc-800 dark:fill-emerald-500 opacity-0 duration-100 group-hover:opacity-100 p-30' /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-emerald-100 dark:bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                    <li><a onClick={() => HandleSetUserToRemove(contact)} className='dark:text-white text-black'><IoIosRemoveCircle className='fill-red-500' size={20} key={contact._id} />Remove</a></li>
                </ul>
            </div>
            <dialog id="my_modal_2" className="modal" key={contact._id}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Do you want to remove this user?</h3>
                    <form method="dialog" className='flex mt-5 justify-end'>
                        <button className='btn bg-red-600 text-black btn-sm rounded-md hover:bg-red-500' key={contact._id} onClick={() => HandleRemoveFriend(userToRemove, userInfo)}>Remove</button>
                        <div className='mx-1'></div>
                        <button className='btn bg-emerald-600 text-black btn-sm rounded-md hover:bg-emerald-500'>Cancel</button>
                    </form>
                </div>
            </dialog>

        </div>
    )
}

export default ContactList
