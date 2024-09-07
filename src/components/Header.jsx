import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "./utills/appSlice";
const Header = () => {

    const dispatch = useDispatch()

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
                <div className="col-span-10 px-10 flex  items-center justify-center
                ">
                    <input type=" text" className="h-10 w-1/2 border border-gray-400 p-2 rounded-l-full" />
                    <button className="h-10 border border-gray-400 px-5 p-2  rounded-r-full bg-gray-200 "><IoSearchOutline /></button>
                </div>
                <div className="col-span-1">
                    <FaUserCircle className="h-7 w-7" />
                </div>

            </div>
        </>
    )
}

export default Header