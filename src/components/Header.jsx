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
    const dispatch = useDispatch();
    const searchCache = useSelector((store) => store.search);


    const getSearchSuggestions = async () => {
        const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
        const json = await response.json();
        setSuggestions(json[1]);

        dispatch(cacheResults({ [searchQuery]: json[1] }));
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);



    const toggleHandler = () => {
        dispatch(toggleMenu());
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="grid grid-flow-col p-3 mx-2 shadow-lg items-center relative">
            <div className="flex col-span-1">
                <div className="flex items-center cursor-pointer" onClick={toggleHandler}>
                    <RxHamburgerMenu className="h-7 w-7" />
                </div>
                <img
                    className="h-16 mx-2"
                    src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-650-80.jpg.webp"
                    alt="YouTube"
                />
            </div>
            <div className="col-span-10 flex items-center px-10">
                <div className="flex flex-grow relative">
                    <input
                        className="h-10 w-full border border-gray-400 p-2 rounded-l-full px-3"
                        type="text"
                        placeholder="Search "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click on suggestion
                    />
                    <button className="h-10 border border-gray-400 px-5 rounded-r-full bg-gray-200 flex items-center justify-center">
                        <IoSearchOutline />
                    </button>
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div className="bg-white py-2 px-2 w-full max-w-md shadow-lg rounded-lg border border-gray-100 absolute z-10">
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="shadow-sm px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown to prevent blur on click
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="col-span-1">
                <FaUserCircle className="h-7 w-7" />
            </div>
        </div>
    );
};

export default Header;
