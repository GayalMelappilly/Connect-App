import { useState, useEffect, useContext, createContext } from 'react';
import { StatusContext } from './AuthContext';
import { UserInfoContext } from './UserInfoContext';
import io from "socket.io-client";


export const SocketContext = createContext(null)

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { status } = useContext(StatusContext);
    const { userInfo } = useContext(UserInfoContext);

    useEffect(() => {
        if (status && userInfo) {
            const socket = io(`${import.meta.env.VTIE_APP_NODE_ENV === 'development' ? import.meta.env.VTIE_APP_LOCAL_URI : import.meta.env.VTIE_APP_RENDER_URI}`, {
                query: {
                    userId: userInfo._id
                }
            });

            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
                console.log("Online Users: ", users);
            });

            return () => {
                socket.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [status, userInfo]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
