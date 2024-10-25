import { useEffect, useState } from "react"
import ChatMessage from "./ChatMessage"
import { useDispatch, useSelector } from "react-redux"
import { addMessage } from "./utills/chatSlice";
import { generateRandomName, makeRandomMessage } from "./utills/helper";





const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("")





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
        }, 2000)

        return () => {
            clearInterval(i)
        }
    }, [])


    return (
        <>
            <div className="flex flex-col w-full">
                <div className="w-full h-[450px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                    <div>
                        {chatMessages.map((c, index) => (
                            <ChatMessage key={index} name={c.name} message={c.message} />
                        ))}
                    </div>
                </div>
                <form className="flex w-full mt-2 ml-2 p-2 border border-black rounded-lg" onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                        addMessage({
                            name: "Rohit Kumar",
                            message: liveMessage,
                        })
                    )
                    setLiveMessage("")
                }}>
                    <input className="w-full px-2" type="text" value={liveMessage} onChange={(e) => {
                        setLiveMessage(e.target.value)
                    }} />
                    <button className="px-2 mx-2 bg-green-100 rounded-md font-bold">Send</button>
                </form>
            </div>

        </>

    )
}

export default LiveChat