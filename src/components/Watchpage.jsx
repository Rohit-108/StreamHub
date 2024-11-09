import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "./utills/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import LiveChat from "./LiveChat";
import { YOUTUBE_VIDEO_DETAIL_API } from "./utills/constant";

export const WatchpageDescription = ({ description }) => {
    // Convert URLs in the description to clickable links
    const formattedDescription = description.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 flex flex-row gap-0">$1</a>'
    );

    return (
        <p
            className="bg-gray-100 mt-2 rounded-xl p-3 flex flex-col whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
    );
};



const Watchpage = () => {
    const [videoData, setVideoData] = useState(null);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const videoId = searchParams.get("v");


    useEffect(() => {
        dispatch(closeMenu());
    }, [dispatch]);

    useEffect(() => {
        if (videoId) {
            videoDetails();
        }
    }, [videoId]);

    const videoDetails = async () => {
        try {
            const response = await fetch(`${YOUTUBE_VIDEO_DETAIL_API}${videoId}`);
            const json = await response.json();
            console.log(json)

            setVideoData(json.items[0]);
        } catch (error) {
            console.error("Failed to fetch video details:", error);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 mt-2 flex flex-col lg:flex-row w-full ">
                <div className="w-full lg:w-[70%] ">
                    <iframe
                        className="w-full h-[250px] sm:h-[350px] lg:h-[500px] rounded-xl"
                        src={`https://www.youtube.com/embed/${videoId}`}
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
            {videoData && (
                <div className="mt-4 px-5 w-full lg:w-[70%]  ">
                    <h1 className="font-bold text-xl">{videoData.snippet.title}</h1>
                    <img className="w-12 h-12 rounded-full" alt="user" src={videoData.snippet.authorProfileImageUrl} />
                    <p className="font-bold mt-1">{videoData.snippet.channelTitle}</p>
                    <p>{(videoData.statistics.viewCount / 1000000).toFixed(2)}M views</p>
                    <WatchpageDescription description={videoData.snippet.description} />
                    <p>{videoData.statistics.commentCount}</p>

                </div>
            )}

            <div className="mt-5">
                <CommentSection />
            </div>
        </div>
    );
};

export default Watchpage;
