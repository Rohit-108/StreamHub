/* eslint-disable react/prop-types */
const VideoCard = ({ info, channelinfo }) => {


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
                <img className="w-[400px] h-[225px] rounded-lg hover:rounded-none" alt="img" src={thumbnails.medium.url} />
                <ul className="w-[400px] h-25 flex pt-0">
                    <div className="flex items-center">
                        <img alt="Channel Thumbnail" className="w-12 h-12 rounded-full" src={thumbnails?.default?.url} />
                    </div>
                    <div className="w-[352px] mx-2 pt-0">
                        <li className="mt-4 text-gray-800 text-sm font-semibold leading-snug ">{title}</li>
                        <li className="text-gray-600">{channelTitle}</li>
                        <div className="flex items-center space-x-1 text-gray-500 text-xm">
                            <li className="text-gray-600">{countToDisplaycount(viewCount)} views</li>
                            <li className="text-gray-600">.</li>
                            <li className="text-gray-600">{formatPublishedDate(publishedAt)}</li>
                        </div>
                    </div>

                </ul>

            </div>
        </>
    )
}

export default VideoCard