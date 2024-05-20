import { createContext, useState } from "react";

export const ContactContext = createContext(null)

export const ContactContextProvider = ({children}) => {
    const [contact, setContact] = useState(null)
    return (
        <ContactContext.Provider value={{contact, setContact}}>
            {children}
        </ContactContext.Provider>
    )
}
