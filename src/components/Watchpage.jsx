import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { closeMenu } from "./utills/appSlice"
import { useSearchParams } from "react-router-dom"
import CommentSection from "./CommentSection"
import LiveChat from "./LiveChat"

const Watchpage = () => {

    const [searchParams] = useSearchParams()
    console.log(searchParams.get("v"))


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(closeMenu)
    }, [])

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 mt-2 flex w-full">
                <div>
                    <iframe width="1000" height="500" src={"https://www.youtube.com/embed/" + searchParams.get("v")}
                        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="flex w-full">
                    <LiveChat />
                </div>

            </div>
            <CommentSection />
        </div>

    )
}

export default Watchpage