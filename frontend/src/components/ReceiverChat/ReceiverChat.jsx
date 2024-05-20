import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'

const ReceiverChat = (props) => {
    return (
        <div className="w-full">
            <div className="grid" >
                <div className="flex my-1 pr-40 max-lg:pr-20">
                    <div className="grid">
                        <div className="dark:bg-emerald-600 flex bg-zinc-800 rounded-se-md rounded-b-md shadow-[0px_3px_10px_rgb(0,0,0,0.4)]">
                            <div className='px-3.5 py-2'>
                                <h5 className="dark:text-black text-slate-200 text-sm font-normal leading-snug          max-sm:text-xs">{props.message}</h5>
                            </div>
                            <div className='pb-1 pr-2 relative end-0 mt-auto'>
                                <h6 className="dark:text-zinc-300 text-slate-100 text-xs font-normal pt-1 overflow-hidden text-ellipsis whitespace-nowrap">{props.currentTime}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiverChat
