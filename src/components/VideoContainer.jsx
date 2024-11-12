import { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "./utills/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const VideoContainer = ({ video }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const response = await fetch(YOUTUBE_VIDEOS_API);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const json = await response.json();
            console.log(json);
            setVideos(json.items);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center p-4"><Shimmer /></div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="flex flex-wrap w-12/12 m-2  md:ml-[90px] ml-[45px] ">
            {videos.map((video) => (
                <Link key={video.id} to={"/watch?v=" + video.id} className="m-2">
                    <VideoCard info={video} channelinfo={video.channelInfo} />
                </Link>
            ))}
        </div>
    );
};

export default VideoContainer;
