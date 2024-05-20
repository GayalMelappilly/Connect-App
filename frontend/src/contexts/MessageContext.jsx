import { createContext, useState } from "react";

export const MessageContext = createContext(null)

export const MessageContextProvider = ({children}) => {
    const [messageInfo, setMessageInfo] = useState(null)
    return (
        <MessageContext.Provider value={{messageInfo, setMessageInfo}}>
            {children}
        </MessageContext.Provider>
    )
}
