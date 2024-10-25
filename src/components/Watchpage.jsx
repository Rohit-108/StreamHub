import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "./utills/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import LiveChat from "./LiveChat";

const Watchpage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeMenu());
    }, [dispatch]);

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 mt-2 flex flex-col lg:flex-row w-full">
                <div className="w-full lg:w-[70%]">
                    <iframe
                        className="w-full h-[250px] sm:h-[350px] lg:h-[500px]"
                        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="flex w-full lg:w-[30%] lg:ml-5 mt-5 lg:mt-0">
                    <LiveChat />
                </div>
            </div>
            <div className="mt-5">
                <CommentSection />
            </div>
        </div>
    );
};

export default Watchpage;
