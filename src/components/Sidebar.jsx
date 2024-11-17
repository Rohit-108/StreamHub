import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Sidebar = () => {

    const isMenuOpen = useSelector(store => store.app.isMenuOpen)


    if (!isMenuOpen) return null;




    return (
        <div className="p-5 shadow-lg w-[230px] ">

            <ul className="w-[300px] pl-12">
                <Link to="/" >
                    <div className="flex justify-around px-2  h-5 w-16  mb-4 text-lg hover:bg-gray-300 hover:font-300 cursor-pointer "><MdHome className="h-9 w-9" />
                        <li >Home </li>
                    </div></Link>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Shorts</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Videos</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Live</li>

            </ul>
            <h1 className="font-bold pt-5">Subscriptions</h1>
            <ul className="w-[300px] pl-12">
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Music</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Sports</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Gaming</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Movies</li>

            </ul>
            <h1 className="font-bold pt-5">Watch Later</h1>
            <ul className="w-[300px] pl-12">
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Music</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Sports</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Gaming</li>
                <li className="h-5 w-12 gap-y-5 text-lg hover:bg-gray-300 cursor-pointer">Movies</li>

            </ul>
        </div>
    )
}

export default Sidebar