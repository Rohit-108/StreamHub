import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleMenu } from "./utills/appSlice";
import { YOUTUBE_SEARCH_API } from "./utills/constant";
import { cacheResults } from "./utills/searchSlice";
import { filterData } from "./utills/helper"; // Assuming the helper contains your filterData function

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dispatch = useDispatch();
    const searchCache = useSelector((store) => store.search);

    const getSearchSuggestions = async () => {
        const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
        const json = await response.json();
        setSuggestions(json[1]);

        // Cache the results
        dispatch(cacheResults({ [searchQuery]: json[1] }));
    };

    // Effect to fetch or use cached suggestions
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                setFilteredSuggestions([]); // Clear if query is empty
                return;
            }

            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
                setFilteredSuggestions(filterData(searchQuery, searchCache[searchQuery]));
            } else {
                getSearchSuggestions();
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Effect to filter suggestions whenever the suggestions list changes
    useEffect(() => {
        setFilteredSuggestions(filterData(searchQuery, suggestions));
    }, [suggestions]);

    const toggleHandler = () => {
        dispatch(toggleMenu());
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="grid grid-flow-col p-1 pl-4 shadow-lg items-center relative">
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
            <div className="h-[40px] w-[730px] flex ml-24">
                <div className="flex flex-grow relative">
                    <input
                        className="h-10 w-full border border-gray-400 p-2 rounded-l-full px-3"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    />
                    <button className="h-10 border border-gray-400 px-5 rounded-r-full bg-gray-200 flex items-center justify-center">
                        <IoSearchOutline />
                    </button>
                </div>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="bg-white py-2 px-2 w-full max-w-md shadow-lg rounded-lg border border-gray-100 absolute z-10">
                        <ul>
                            {filteredSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="shadow-sm px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onMouseDown={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="w-[100px] ml-28 flex items-center justify-center border border-1 rounded-full px-1.5 py-1.5 gap-x-2 text-blue-600 text-sm">
                <FaUserCircle className="h-5 w-5" />
                <p className="flex items-center pb-0.5 font-medium">Sign in</p>
            </div>
        </div>
    );
};

export default Header;
