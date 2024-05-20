import React, { useContext, useEffect } from 'react'
import About from '../../components/About/About'
import Bg from '../../components/Bg/Bg'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { StatusContext } from '../../contexts/AuthContext'
import { UserInfoContext } from '../../contexts/UserInfoContext'

function GetStarted() {

  const navigate = useNavigate()

  const { setStatus } = useContext(StatusContext)
  const { setUserInfo } = useContext(UserInfoContext)

  useEffect(() => {
    const urlEncodedString = document.cookie
    if (urlEncodedString) {
      const decodedString = decodeURIComponent(urlEncodedString);
      const jsonSubstring = decodedString.substring(decodedString.indexOf("{"));
      const userData = JSON.parse(jsonSubstring);
      setStatus(true)
      setUserInfo(userData)
    
      navigate('/')
    }
  },[])
  return (
    <div>
        <Bg />
        <About />
        <Footer />
    </div>
  )
}

export default GetStarted