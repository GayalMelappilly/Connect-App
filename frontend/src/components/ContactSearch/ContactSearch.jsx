import React from 'react'
import { CiSearch } from 'react-icons/ci'

const ContactSearch = ({mdProp}) => {
    return (
        <>
            <span className={`absolute inset-y-0 left-0 flex items-center pl-2 ${mdProp ? 'max-md:hidden' : 'max-md:opacity-100'}`}>
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <CiSearch size={20} />
                </button>
            </span>
            <input type="search" name="q" className={`py-2 text-sm bg-transparent dark:bg-[#1B1E1C] rounded-md pl-10 focus:outline-none placeholder:text-black" `} placeholder="Search..." autoComplete="off" />
        </>
    )
}

export default ContactSearch
