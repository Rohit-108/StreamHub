import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { MdHome, MdLocalMovies } from "react-icons/md";
import { RiMovieFill, RiLiveFill } from "react-icons/ri";
import { SiYoutubeshorts, SiYoutubegaming } from "react-icons/si";
import { IoMusicalNotes } from "react-icons/io5";
import { AiFillTrophy } from "react-icons/ai";
const Sidebar = () => {

    const isMenuOpen = useSelector(store => store.app.isMenuOpen)


    if (!isMenuOpen) return null;




    return (
        <div className="sticky top-0 p-2.5 shadow-lg w-[230px] ">

            <ul className="w-[200px] ">
                <Link to="/"  >
                    <div className="flex bg-gray-200 rounded-xl items-center py-1.5 "><MdHome className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg font-bold" >Home </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><SiYoutubeshorts className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Shorts </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><RiMovieFill className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Videos </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><RiLiveFill className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Live </li>
                    </div></Link>

            </ul>
            <h1 className="font-bold pt-5">Subscriptions</h1>
            <ul className="w-[200px] ">
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Trending </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Shoping </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><IoMusicalNotes className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Music </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Movies </li>
                    </div></Link>

            </ul>
            <h1 className="font-bold pt-5">Watch Later</h1>
            <ul className="w-[200px]">
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Live </li>
                    </div></Link>

                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><SiYoutubegaming className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Gaming </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >News </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><AiFillTrophy className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Sports </li>
                    </div></Link>
                <Link to="/"  >
                    <div className="flex hover:bg-gray-200 hover:rounded-xl items-center py-1.5 "><MdLocalMovies className="h-8 w-8 pl-2" />
                        <li className="ml-5 text-lg " >Courses </li>
                    </div></Link>


            </ul>
        </div>
    )
}

export default Sidebar