import { createContext, useState } from "react";

export const UserInfoContext = createContext(null)

export const UserInfoContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(null)
    return (
        <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserInfoContext.Provider>
    )
}
