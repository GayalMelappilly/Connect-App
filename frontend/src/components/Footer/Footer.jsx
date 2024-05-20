import React, { useState } from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Footer() {

    const [hover, setHover] = useState(false)

    return (
        <div className='h-auto bg-neutral-950 flex py-10 justify-between px-32 max-md:px-10 max-md:relative'>
            <div className=''>
                <h1 className='text-white text-5xl pt-3  awelier     max-md:text-4xl max-sm:text-2xl'>Get in Touch</h1>
                <div className='flex pt-2'>
                    <Link to={'https://github.com/GayalMelappilly'} ><FaGithubSquare className='text-yellow-100 max-md:h-10  max-sm:h-8' size={50} /></Link>
                    <Link to={'https://www.instagram.com/__.g_m_s.__/'}><FaInstagramSquare className='text-yellow-100 max-md:h-10  max-sm:h-8  max-sm:-mx-3' size={50} /></Link>
                    <FaLinkedin className='text-yellow-100 max-md:h-10   max-sm:h-8' size={50} />
                </div>
            </div>
            {/* <div className='max-md:mx-10'></div> */}
            <div className='flex'>
                <p className={`${hover ? '-translate-x-40 max-sm:hidden' : 'opacity-0 pointer-events-none'} awelier  text-2xl text-yellow-100 py-auto absolute text-right`}>Reach out <br /> to me <br /> through Gmail</p>
                <Link to={'mailto:gayalsunil@gmail.com'}>
                    <div className={`flex py-auto h-28 w-28 bg-yellow-100 rounded-tl-2xl rounded-br-2xl cursor-pointer ${hover ? '-rotate-90' : null}  max-sm:h-24 max-sm:w-24`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <HiOutlineMail className={`text-neutral-900 max-md:h-10 m-auto ${hover ? 'rotate-90' : null}`} size={60} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Footer