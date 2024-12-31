import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "./utills/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { formatNumber, formatPublishedDate, NumberFormatter } from "./utills/constant"
import { YOUTUBE_VIDEO_DETAIL_API, GOOGLE_API_KEY } from "./utills/constant";
import SuggestionCard from "./SuggestionCard";
import InfiniteScroll from 'react-infinite-scroll-component';

const Watchpage = () => {
    const [videoData, setVideoData] = useState(null);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const videoId = searchParams.get("v");
    const [expanded, setExpanded] = useState(true);
    const [suggestionData, setSuggestionData] = useState([]);
    const [totalSuggestionResults, setTotalSuggestionResults] = useState(0);
    const [suggestionPageToken, setSuggestionPageToken] = useState(null);

    useEffect(() => {
        fetchSuggestion();
    }, [videoData]);

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
            setVideoData(json.items[0]);
        } catch (error) {
            console.error("Failed to fetch video details:", error);
        }
    };

    const fetchSuggestion = async () => {
        const suggestion_response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&videoCategoryId=${videoData.snippet.categoryId}&key=${GOOGLE_API_KEY}`);
        const suggestion_data = await suggestion_response.json();

        setTotalSuggestionResults(suggestion_data.pageInfo.totalResults);
        setSuggestionPageToken(suggestion_data.nextPageToken);
        setSuggestionData(suggestion_data.items);
    };

    const fetchMoreSuggestions = async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=${suggestionPageToken}&maxResults=15&regionCode=IN&videoCategoryId=${videoData.snippet.categoryId}&key=${GOOGLE_API_KEY}`);
        const data = await response.json();

        setSuggestionPageToken(data.nextPageToken);
        setSuggestionData((prevSuggestionData) => prevSuggestionData.concat(data.items));
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
        <div className="flex w-full mx-20">
            <div className="px-5 mt-2  w-full lg:w-[70%]  ">
                <div className="w-full px-4 lg:px-6 mt-4">
                    <iframe
                        className="w-full h-[250px] sm:h-[350px] lg:h-[500px] rounded-xl"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                    {videoData && (
                        <div className=" w-full   ">
                            <h1 className="font-bold text-xl">{videoData.snippet.title}</h1>
                            <div className="flex items-center justify-between">
                                <div className="gap-y-10 flex items-center justify-between">
                                    <div className="gap-y-2.5 gap-x-1 flex items-center justify-between">
                                        <img className="w-12 h-12 rounded-full" alt="user" src={videoData && videoData.snippet.thumbnails.medium.url} />
                                        <div className="mx-1">
                                            <p className="font-bold mt-1">{videoData.snippet.channelTitle}</p>
                                            <p className="text-[#444] text-[16px]">{videoData ? `${formatNumber(videoData.statistics.subscriberCount)} subscribers` : 'unavailable'}</p>
                                        </div>
                                    </div>
                                    <button className="text-white font-500 py-2 px-4 ml-8 bg-[#151515] rounded-3xl">Subscribe</button>
                                </div>
                                <div className="gap-y-3 gap-x-3  flex items-center justify-between">
                                    <div className="flex flex-nowrap py-2.5 px-3.5 border border-none">
                                        <button className="bg-[#0000000d]"><i className='bx bx-like mr-1 scale-1 rounded-l-2xl rounded-bl-2xl
                                border border-r-gray-[#999999] bx-like'></i>{videoData ? formatNumber(videoData.statistics.likeCount) : 'unavailable'}</button>
                                        <button className="bg-[#0000000d]"><i className='bx bx-dislike mr-1 scale-1  bx-dislike'></i></button>
                                    </div>
                                    <button className='flex flex-nowrap py-1.5 px-2.5 border border-none rounded-2xl bg-[#0000000d] items-center'><i className='bx bx-share mr-1 scale-1  bx-share'></i>Share</button>
                                    <button className='flex flex-nowrap py-1.5 px-2.5 border border-none rounded-2xl bg-[#0000000d] items-center'><i className='bx bx-down-arrow-alt mr-1 scale-1 bx-down-arrow-alt'></i>Download</button>
                                    <button className='flex flex-nowrap py-1.5 px-2.5 border border-none rounded-2xl bg-[#0000000d] items-center'><i className='mr-1 scale-1  bx bx-dots-horizontal-rounded'></i></button>
                                </div>
                            </div>

                            <div className="width-[100%] my-3 mx-0 p-3 bg-[#0000000d] rounded-xl cursor-pointer">
                                <div className="text-md font-bold mb-5">
                                    {videoData && `${formatNumber(videoData.statistics.viewCount)} views  ${formatPublishedDate(videoData.snippet.publishedAt)}`}
                                </div>
                                <pre className="h-20 text-400 font-400 contain-content overflow-visible whitespace-pre-wrap" onClick={toggleDescription}>
                                    {videoData ? shortDescription(videoData.snippet.description) : 'Description is not available'}
                                </pre>
                            </div>

                            <p className="mt-6 text-xl font-bold">{`${videoData.statistics.commentCount} Comments:`}</p>


                        </div>
                    )}

                </div>
                <div className="">
                    <CommentSection />
                </div>

            </div>


            <div className="flex w-full lg:w-[30%]">
                <InfiniteScroll
                    className="w-full"
                    dataLength={suggestionData.length}
                    next={fetchMoreSuggestions}
                    hasMore={suggestionData.length !== totalSuggestionResults}
                    loader={
                        <div className="w-full flex justify-center mt-5">
                            <span className="w-8 h-8 border-4 border-gray-300 border-b-transparent rounded-full animate-spin"></span>
                        </div>
                    }
                    style={{ overflow: 'auto', scrollbarWidth: 'none' }}
                >
                    <div className="w-[405px] min-w-[300px] pt-5 pr-6">
                        {suggestionData.map(
                            (element, index) =>
                                element.snippet && <SuggestionCard key={index} info={element} />
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Watchpage;
