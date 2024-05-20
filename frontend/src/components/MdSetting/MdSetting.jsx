import React, { useEffect, useState } from 'react'
import { IoMdSettings } from 'react-icons/io'
import { MdDarkMode, MdKeyboardArrowLeft } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const MdSetting = ({ setMdShowSettings, setMdProp, setDarkmode, darkmode }) => {

    console.log("MODE : ", darkmode)

    return (
        <div className=''>
            <div className='w-full bg-transparent rounded-md'>
                <div className='flex pl-4 pt-2'>
                    <button className='bg-emerald-900 dark:bg-slate-300 h-8 rounded-lg w-8' onClick={() => {
                        setMdShowSettings(false)
                        setMdProp(false)
                    }}><MdKeyboardArrowLeft size={30} className='fill-white dark:fill-black mx-auto' /></button>
                    <h2 className='font-thin text-2xl pl-3 text-emerald-800 dark:text-white'>Settings</h2>
                </div>
                <hr className='opacity-100 dark:opacity-50 my-5 border-emerald-900 dark:border-slate-400' />
                <div className='ml-2 flex p-2 px-4'>
                    <div className='flex mt-2 shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-3'>
                        <p className='-rotate-90 -mr-6 text-emerald-900 dark:text-current'>M O D E</p>
                        <button className='shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg p-3'>
                            {darkmode ? <MdDarkMode size={40} className='fill-purple-600 glow-dark' onClick={() => setDarkmode(false)} /> : <MdLightMode size={40} className='fill-yellow-500 glow-light' onClick={() => setDarkmode(true)} />}
                        </button>
                        <p className='rotate-90 -ml-6 text-emerald-900 dark:text-current'>{darkmode ? 'D A R K' : 'L I G H T'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MdSetting
