import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { MessageContext } from '../../contexts/MessageContext';

const SenderChat = (props) => {

    const { messageInfo, setMessageInfo } = useContext(MessageContext);

    const [hover, setHover] = useState(false)
    const [index, setIndex] = useState('')

    // console.log("INDEX S : ",props.index)
    useEffect(() => {
        setIndex(props.index)
        console.log("MIFNO : ", messageInfo)
    }, [messageInfo])

    const handleDeleteMessage = () => {
        console.log("INFO :", props.details)
        axios.put('http://localhost:5000/message/delete-message', { receiverId: props.details.receiverId, senderId: props.details.senderId, messageId: props.details._id }).then((response) => {
            console.log(response.data)
            setMessageInfo(response.data)
        })
    }

    return (
        <div className="w-full">
            <div className="flex justify-end pl-40 max-lg:pl-20">
                <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div className="flex mb-2 relative">
                        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.4)] dark:bg-transparent bg-emerald-200 rounded-b-md rounded-ss-md flex">
                            <div className='px-3 py-3 pr-4'>
                                <h2 className="dark:text-white text-black text-sm font-normal leading-snug          max-sm:text-xs">{props.message}</h2>
                            </div>
                            <div className='pr-2 relative end-0 mt-auto'>
                                <h3 className="text-gray-500 text-xs font-normal leading-4 py-1 overflow-hidden text-ellipsis whitespace-nowrap">{props.currentTime}</h3>
                            </div>
                        </div>
                        <div className='absolute'>
                            <button className={`${hover ? 'opacity-80' : 'opacity-0 absolute'}`} onClick={handleDeleteMessage}><MdDelete className='fill-red-500' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SenderChat
