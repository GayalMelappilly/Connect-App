import { createContext, useState } from "react";

export const StatusContext = createContext(null)

export const StatusContextProvider = ({children}) => {
    const [status, setStatus] = useState(false)
    return (
        <StatusContext.Provider value={{status, setStatus}}>
             {children}
        </StatusContext.Provider>
    )
}
