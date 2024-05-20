import React, { useContext, useEffect, useState } from 'react'
import { UserInfoContext } from '../../contexts/UserInfoContext'
import { ContactContext } from '../../contexts/ContactContext'
import axios from 'axios'
import { MessageContext } from '../../contexts/MessageContext'
import { SocketContext } from '../../contexts/SocketContext'
import { StatusContext } from '../../contexts/AuthContext'
import MdProfile from '../MdProfile/MdProfile'
import MdUserSearch from '../MdUserSearch/MdUserSearch'
import MdSetting from '../MdSetting/MdSetting'
import MdSideBar from '../MdSideBar/MdSideBar'
import MdContactBar from '../MdContactBar/MdContactBar'
import ContactList from '../ContactList/ContactList'
import ContactSearch from '../ContactSearch/ContactSearch'

function Contacts() {

    const { userInfo } = useContext(UserInfoContext)
    const { contact } = useContext(ContactContext)
    const { messageInfo, setMessageInfo } = useContext(MessageContext)
    const { onlineUsers } = useContext(SocketContext)
    const { status, setStatus } = useContext(StatusContext)

    const [mdContactBar, setMdContactBar] = useState(null)
    const [allContacts, setAllContacts] = useState([])
    const [selection, setSelection] = useState(null);
    const [userToRemove, setUserToRemove] = useState(null)
    const [mdShowProfile, setMdShowProfile] = useState(false)
    const [mdShowSettings, setMdShowSettings] = useState(false)
    const [mdShowUserSearch, setMdShowUserSearch] = useState(false)
    const [mdProp, setMdProp] = useState(false)
    const [darkmode, setDarkmode] = useState(true)
    const [reqCount, setReqCount] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/request-list?id=${userInfo._id}`).then((response) => {
            if (response.data) {
                setReqCount(response.data.incomingRequests.length)
            }
        })
    })

    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    useEffect(() => {
        axios.post('http://localhost:5000/user/contacts', { userId: userInfo._id }).then((response) => {
            setAllContacts(response.data.contacts)
        })
    }, [userInfo])


    useEffect(() => {
        setAllContacts(contact)
    }, [contact])

    return (
        <div className={`m-2 w-3/6 p-3 rounded-s-lg dark:bg-opacity-80 bg-center text-white dark:backdrop-blur-sm dark:bg-transparent dark:shadow-[0_3px_10px_rgb(0,0,0,0.4)] bg-emerald-100 shadow-gray-400 shadow-[1px_1px_8px_rgb(0,0,0,0.2)] transition-all ease-in-out duration-700 max-md:w-auto max-md:rounded-b-none ${messageInfo ? 'max-md:h-20' : 'max-md:h-5/6'}    ${mdProp ? 'max-lg:w-7/12' : null} ${mdShowUserSearch ? 'max-md:w-auto max-lg:w-10/12' : null}    max-xl:w-5/12`}>
            {!mdProp && <div className={`relative text-gray-600 focus-within:text-gray-400            max-md:flex  ${messageInfo ? 'max-md:hidden' : null} transition-all ease-in-out duration-700`}>
                <ContactSearch
                    mdProp={mdProp}
                />

                {window.innerWidth <= 1024 &&
                    <MdSideBar
                        setMdShowSettings={setMdShowSettings}
                        setMdProp={setMdProp}
                        setMdShowUserSearch={setMdShowUserSearch}
                        setMdShowProfile={setMdShowProfile}
                        reqCount={reqCount}
                        setStatus={setStatus}
                        status={status}
                    />
                }
            </div>}

            {mdShowProfile && <MdProfile
                setMdShowProfile={setMdShowProfile}
                setMdProp={setMdProp}
            />}
            {mdShowUserSearch && <MdUserSearch
                setMdShowUserSearch={setMdShowUserSearch}
                setMdProp={setMdProp}
            />}
            {mdShowSettings && <MdSetting
                setMdShowSettings={setMdShowSettings}
                setMdProp={setMdProp}
                setDarkmode={setDarkmode}
                darkmode={darkmode}
            />}

            {selection !== null && mdContactBar && window.innerWidth <= 768 &&
                <MdContactBar
                    mdContactBar={mdContactBar}
                    setSelection={setSelection}
                    setMessageInfo={setMessageInfo}
                />
            }
            {!mdProp && <hr className={`${messageInfo ? 'max-md:hidden' : null}`} />}
            <div className='h-2'></div>
            <div className={`flex flex-col ${mdProp ? 'hidden' : 'opacity-100'}    ${messageInfo ? 'max-md:hidden' : null}`}>
                {allContacts && allContacts.map((contact) => (
                    <ContactList
                        key={contact._id}
                        contact={contact}
                        selection={selection}
                        onlineUsers={onlineUsers}
                        userToRemove={userToRemove}
                        userInfo={userInfo}
                        setAllContacts={setAllContacts}
                        setSelection={setSelection}
                        setUserToRemove={setUserToRemove}
                        setMessageInfo={setMessageInfo}
                        setMdContactBar={setMdContactBar}
                    />
                ))}
            </div>
        </div>
    )
}

export default Contacts