import React from 'react'
import { IoIosRemoveCircle } from 'react-icons/io'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { PiDotsThreeOutlineVerticalBold } from 'react-icons/pi'

const MdContactBar = ({mdContactBar, setSelection, setMessageInfo }) => {
    return (
        <div className={`relative text-gray-600 focus-within:text-gray-400 h-60`}>
            {/* {alert("REAched")} */}
            <div className='flex'>
                <div>
                    <button className='bg-slate-300 h-full rounded-lg w-8' onClick={() => {
                        setSelection(null)
                        setMessageInfo(null)
                    }}><MdKeyboardArrowLeft size={30} className='fill-black mx-auto' /></button>
                </div>
                <div className='mx-1.5'></div>
                <img className='rounded-lg w-14 h-14' src={`${mdContactBar.image}`} alt="" />
                <div className='mx-1.5'></div>
                <div>
                    <h1 className='text-xl text-white'>{mdContactBar.displayName}</h1>
                    <p className='text-emerald-500'>{mdContactBar.email}</p>
                </div>
                <div className={`dropdown dropdown-end inset-y-0 my-auto ml-auto`}>
                    <div tabIndex={0} role="button" className="m-1"><PiDotsThreeOutlineVerticalBold size={25} className='fill-emerald-500 duration-100 group-hover:opacity-100 p-30' /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-[#1B1E1C] rounded-s-md rounded-b-md w-52 shadow-[0_3px_10px_rgb(0,0,0,0.4)]">
                        <li><a><IoIosRemoveCircle className='fill-red-500' size={20} />Remove</a></li>
                    </ul>
                </div>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Do you want to remove this user?</h3>
                        <form method="dialog" className='flex mt-5 justify-end'>
                            <button className='btn bg-red-600 text-black btn-sm rounded-md hover:bg-red-500'>Remove</button>
                            <div className='mx-1'></div>
                            <button className='btn bg-emerald-600 text-black btn-sm rounded-md hover:bg-emerald-500'>Cancel</button>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default MdContactBar
