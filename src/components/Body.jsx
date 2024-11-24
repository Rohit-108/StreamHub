import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"

const Body = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <Outlet />
        </div>

    )
}

export default Body
