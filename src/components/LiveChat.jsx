import { useEffect } from "react"
import ChatMessage from "./ChatMessage"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "./utills/chatSlice";
import { generateRandomName, makeRandomMessage } from "./utills/helper";





const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessages = useSelector((store) => store.chat.messages)


    useEffect(() => {
        const i = setInterval(() => {
            //api polling
            console.log("api polling");

            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: makeRandomMessage(20),
                })
            )
        }, 500)

        return () => {
            clearInterval(i)
        }
    }, [])


    return (
        <div className="w-full h-[500px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
            {chatMessages.map((c, index) => (
                <ChatMessage key={index} name={c.name} message={c.message} />
            ))}
        </div>
    )
}

export default LiveChat