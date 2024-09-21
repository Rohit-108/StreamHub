import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaBullseye, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "./utills/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "./utills/constant";
import { cacheResults } from "./utills/searchSlice"
const Header = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const searchCache = useSelector((store) => store.search)
    const dispatch = useDispatch()
    useEffect(() => {

        const timer = setTimeout(() => getSearchSuggestions(), 200);
        if (searchCache[searchQuery]) {
            setSuggestions(searchCache[searchQuery]);
        }
        else {
            getSearchSuggestions()
        }
        return () => {
            clearTimeout(timer)
        };

    }, [searchQuery])

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery)
        const json = await data.json()
        setSuggestions(json[1])


        dispatch(cacheResults({
            [searchQuery]: json[1]
        }))

    }



    const togglehandler = () => {
        dispatch(toggleMenu())

    }

    return (
        <>
            <div className="grid grid-flow-col p-3 mx-2 shadow-lg items-center">
                <div className="flex col-span-1 ">
                    <div className="flex items-center cursor-pointer">
                        <RxHamburgerMenu className="h-7 w-7" onClick={() => togglehandler()} />
                    </div>


                    <img className="h-16 mx-2" src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-650-80.jpg.webp" alt="youtube" />


                </div>
                <div className="col-span-10 px-10 
                ">
                    <div>
                        <input type=" text" className="h-10 w-1/2 border border-gray-400 p-2 rounded-l-full" value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setShowSuggestions(false)}
                        />
                        <button className="h-10 border border-gray-400 px-5 p-2  rounded-r-full bg-gray-200 "><IoSearchOutline /></button>
                    </div>
                    {showSuggestions && (
                        <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
                            <ul>
                                {suggestions.map((s) => (
                                    <li key={s} className="shadow-sm px-3 py-2 hover:bg-gray-100">{s}</li>

                                ))}
                            </ul>
                        </div>
                    )}


                </div>
                <div className="col-span-1">
                    <FaUserCircle className="h-7 w-7" />
                </div>

            </div>
        </>
    )
}

export default Header