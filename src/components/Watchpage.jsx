import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { closeMenu } from "./utills/appSlice"
import { useSearchParams } from "react-router-dom"
import CommentSection from "./CommentSection"


const Watchpage = () => {

    const [searchParams] = useSearchParams()
    console.log(searchParams.get("v"))


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(closeMenu)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="px-5 m-2">
                <iframe width="1000" height="500" src={"https://www.youtube.com/embed/" + searchParams.get("v")}
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <CommentSection />
        </div>

    )
}

export default Watchpage