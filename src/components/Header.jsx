import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleMenu } from "./utills/appSlice";
import { YOUTUBE_SEARCH_API } from "./utills/constant";
import { cacheResults } from "./utills/searchSlice";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);
        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    const getSearchSuggestions = async () => {
        console.log("API Called" + searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        dispatch(
            cacheResults({
                [searchQuery]: json[1],
            })
        );
    };

    const togglehandler = () => {
        dispatch(toggleMenu());
    };

    return (
        <>
            <div className="grid grid-flow-col p-3 mx-2 shadow-lg items-center">
                {/* Left Section */}
                <div className="flex items-center col-span-1 space-x-4">
                    <RxHamburgerMenu
                        className="h-7 w-7 cursor-pointer"
                        onClick={togglehandler}
                    />
                    <img
                        className="h-10 sm:h-12"
                        src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-650-80.jpg.webp"
                        alt="youtube"
                    />
                </div>

                {/* Middle Section (Search Input) */}
                <div className="col-span-10 flex justify-center relative">
                    <div className="flex w-full max-w-xl">
                        <input
                            type="text"
                            className="h-10 w-full border border-gray-400 p-2 rounded-l-full text-sm sm:text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setShowSuggestions(false)}
                        />
                        <button className="h-10 border border-gray-400 px-5 p-2 rounded-r-full bg-gray-200">
                            <IoSearchOutline className="h-5 w-5" />
                        </button>
                    </div>
                    {showSuggestions && (
                        <div className="absolute top-full mt-2 bg-white py-2 w-full max-w-xl shadow-lg rounded-lg border border-gray-100 z-10">
                            <ul>
                                {suggestions.map((s, index) => (
                                    <li
                                        key={index}
                                        className="shadow-sm px-3 py-2 hover:bg-gray-100 text-sm sm:text-base"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex justify-end col-span-1">
                    <FaUserCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
            </div>
        </>
    );
};

export default Header;
