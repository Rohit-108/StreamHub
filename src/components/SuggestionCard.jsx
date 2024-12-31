import Link from "react-router-dom";

const SuggestionCard = ({ info }) => {
    if (!info || !info.snippet) {
        return null; // Prevent rendering if info or snippet is invalid
    }

    const { snippet } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;

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

    return (
        <Link to={`/watching=${props.url}`} onClick={() => { setVideoId(props.url) }}>
            <div className="flex mb-4">
                <img className="mr-2 h-[94px] w-[168px] aspect-[16/9] rounded-lg" alt="img" src={thumbnails.medium.url} />
                <div className="text-black leading-2 font-500 mb-1.2">
                    <li className="text-black text-sm leading-5 font-medium mb-1">
                        {title.length > 80 ? title.slice(0, 81) + "..." : title}
                    </li>
                    <li className="text-sm text-gray-600">{channelTitle}</li>
                    <div className="flex items-center space-x-1 text-gray-500 text-xm">
                        <li className="text-gray-600">{formatPublishedDate(publishedAt)}</li>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default SuggestionCard
