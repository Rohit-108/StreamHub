import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "./utills/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import LiveChat from "./LiveChat";
import { formatNumber, formatPublishedDate, NumberFormatter } from "./utills/constant"
import { YOUTUBE_VIDEO_DETAIL_API } from "./utills/constant";

const Watchpage = () => {
    const [videoData, setVideoData] = useState(null);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const videoId = searchParams.get("v");
    const [expanded, setExpanded] = useState(true);


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

    const shortDescription = (text) => {
        if (text.length > 600) {
            return text.slice(0, 601) + '...';
        } else {
            return text;
        }
    }

    const toggleDescription = (event) => {

        const content = videoData.snippet.description;
        const views = videoData.statistics.viewCount;
        const date = videoData.snippet.publishedAt;
        setExpanded(!expanded)

        if (expanded) {
            event.target.previousElementSibling.textContent = `${NumberFormatter(views)} views ${formatPublishedDate(date)}`;
            event.target.style.height = 'fit-content';
            event.target.textContent = content;
        } else {
            event.target.previousElementSibling.textContent = `${formatNumber(views)} views ${formatPublishedDate(date)}`;
            event.target.style.height = '100px';
            event.target.textContent = shortDescription(content);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 mt-2 flex flex-col lg:flex-row w-full ">
                <div className="w-full lg:w-[70%] ">
                    <iframe
                        className="w-full h-[250px] sm:h-[350px] lg:h-[500px] rounded-xl"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
                    <div className="gap-y-10">
                        <div className="gap-y-2.5">
                            <img className="w-12 h-12 rounded-full" alt="user" src={videoData && videoData.snippet.thumbnails.medium.url} />
                            <div>
                                <p className="font-bold mt-1">{videoData.snippet.channelTitle}</p>
                                <p className="text-[#444] text-[16px]">{videoData ? `${formatNumber(videoData.statistics.subscriberCount)} subscribers` : 'unavailable'}</p>
                            </div>
                        </div>
                        <button className="text-white font-500 py-2 px-4 bg-[#151515] rounded-3xl">Subscribe</button>
                    </div>
                    <div className="gap-y-3">
                        <div id="like-dislike">
                            <button><i className='bx bx-like'></i>{videoData ? formatNumber(videoData.statistics.likeCount) : 'unavailable'}</button>
                            <button><i className='bx bx-dislike'></i></button>
                        </div>
                        <button className='analy-btn'><i className='bx bx-share'></i>Share</button>
                        <button className='analy-btn'><i className='bx bx-down-arrow-alt'></i>Download</button>
                        <button className='analy-btn'><i className='bx bx-dots-horizontal-rounded'></i></button>
                    </div>



                    <p>{(videoData.statistics.viewCount / 1000000).toFixed(2)}M views</p>
                    <div className="width-[100%] my-3 mx-0 p-3 bg-[#0000000d] rounded-xl cursor-pointer">
                        <div className="text-md font-bold mb-5">
                            {videoData && `${formatNumber(videoData.statistics.viewCount)} views  ${formatPublishedDate(videoData.snippet.publishedAt)}`}
                        </div>
                        <pre className="h-20 text-400 font-400 contain-content overflow-visible whitespace-pre-wrap" onClick={toggleDescription}>
                            {videoData ? shortDescription(videoData.snippet.description) : 'Description is not available'}
                        </pre>
                    </div>

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
