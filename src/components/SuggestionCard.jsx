import React from "react";
import { Link } from "react-router-dom";

const SuggestionCard = ({ info }) => {
    if (!info || !info.snippet || !info.statistics) {
        return null;
    }

    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;
    const { viewCount } = statistics;

    const formatPublishedDate = (dateString) => {
        const publishedDate = new Date(dateString);
        const now = new Date();
        const secondsDiff = Math.floor((now - publishedDate) / 1000);

        if (secondsDiff < 60) {
            return `${secondsDiff} seconds ago`;
        } else if (secondsDiff < 3600) {
            return `${Math.floor(secondsDiff / 60)} minutes ago`;
        } else if (secondsDiff < 86400) {
            return `${Math.floor(secondsDiff / 3600)} hours ago`;
        } else if (secondsDiff < 2592000) {
            return `${Math.floor(secondsDiff / 86400)} days ago`;
        } else if (secondsDiff < 31536000) {
            return `${Math.floor(secondsDiff / 2592000)} months ago`;
        } else {
            return `${Math.floor(secondsDiff / 31536000)} years ago`;
        }
    };

    const countToDisplayCount = (views) => {
        if (views >= 1000 && views < 1000000) {
            return `${(views / 1000).toFixed(1)}K`;
        } else if (views >= 1000000 && views < 1000000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000000000) {
            return `${(views / 1000000000).toFixed(1)}B`;
        } else {
            return views || "Unavailable";
        }
    };

    return (
        <Link
            to={`/watching=${info.id?.videoId || ""}`} // Ensure videoId is used correctly
            className="no-underline"
        >
            <div className="flex flex-col sm:flex-row mb-10 sm:mb-4 ">
                <img
                    className="mb-4 sm:mb-0 sm:mr-2 rounded-lg sm:w-[168px] sm:h-[94px] w-full aspect-video"
                    alt="thumbnail"
                    src={thumbnails?.medium?.url || ""}
                />
                <div className="px-3 sm:px-0">
                    <h5 className="text-black text-sm leading-5 font-medium mb-1">
                        {title.length > 80 ? `${title.slice(0, 80)}...` : title}
                    </h5>
                    <p className="text-gray-500 text-xs">{channelTitle || "Unknown Channel"}</p>
                    <div className="text-gray-500 text-xs">
                        <span className="text-gray-600">
                            {countToDisplayCount(viewCount)} views
                        </span>{" "}
                        • <span>{formatPublishedDate(publishedAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SuggestionCard;
