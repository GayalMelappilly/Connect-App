import { useContext, useEffect } from "react"
import { SocketContext } from "../contexts/SocketContext"
import { MessageContext } from "../contexts/MessageContext"

const useListenMessages = () => {
    const { socket } = useContext(SocketContext)
    const { messageInfo, setMessageInfo } = useContext(MessageContext)

    useEffect(() => {
        console.log("Trying to set up socket event listener...");
        try {
            socket?.on("newMessage", (newMessage) => {
                console.log("REACHED SOCKET CONTEXT");
                console.log("NEW MESSAGE : ", newMessage);

                // Ensure messageInfo is not null or undefined and messages is an array
                if (messageInfo && Array.isArray(messageInfo.messages)) {
                    const updatedMessages = [...messageInfo.messages, newMessage];
                    console.log("UPDATED MSG : ", updatedMessages);

                    setMessageInfo(prevState => ({
                        ...prevState,
                        messages: updatedMessages
                    }));
                } else {
                    const updatedMessages = [newMessage];
                    console.log("UPDATED MSG : ", updatedMessages);

                    setMessageInfo(prevState => ({
                        ...prevState,
                        messages: updatedMessages
                    }));
                }
            });
            console.log("Socket event listener successfully set up.");
        } catch (error) {
            console.error("Error setting up socket event listener:", error);
        }

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, setMessageInfo, messageInfo]);
}

export default useListenMessages
