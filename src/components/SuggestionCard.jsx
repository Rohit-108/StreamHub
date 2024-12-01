const SuggestionCard = ({ info, channelinfo }) => {


    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;
    const { viewCount } = statistics;



    // Function to format the published date
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

    const countToDisplaycount = (viewCount) => {
        if (viewCount >= 1000 && viewCount <= 999999) {
            let value = viewCount / 1000;
            let out = value.toFixed(1);
            return out + "k";
        }
        else if (viewCount >= 1000000 && viewCount <= 999999999) {
            let value = viewCount / 1000000;
            let out = value.toFixed(1);
            return out + "M";
        }
        else if (viewCount >= 1000000000) {
            let value = viewCount / 1000000000;
            let out = value.toFixed(1);
            return out + "B";
        }
        else {
            return viewCount
        }
    }

    return (
        <>
            <div className="p-2 m-1 cursor-pointer  rounded-lg w-[500px] md:w-[400px]">
                <img className="mr-2 h-[94px] w-[168px] aspect-[16/9] rounded-lg" alt="img" src={thumbnails.medium.url} />
                <div className="flex flex-col justify-between">
                    <img alt="Channel Thumbnail" className="w-12 h-12 rounded-full" src={snippet.thumbnails.medium.url} />
                </div>
                <div className="flex flex-col justify-between">
                    <li className="text-black text-sm leading-5 font-medium mb-1 ">{title.length > 80 ? title.slice(0, 81) + '...' : title}</li>
                    <li className="text-sm text-gray-600">{channelTitle}</li>
                    <div className="flex items-center space-x-1 text-gray-500 text-xm">
                        <li className="text-gray-600">{countToDisplaycount(viewCount)} views</li>
                        <li className="text-gray-600">.</li>
                        <li className="text-gray-600">{formatPublishedDate(publishedAt)}</li>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SuggestionCard

