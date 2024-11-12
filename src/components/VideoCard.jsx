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
            <div className="p-2 m-2 cursor-pointer  rounded-lg w-[400px] md:w-[300px]">
                <img className="w-[350px] md:w-[300px] rounded-lg hover:rounded-none" alt="img" src={thumbnails.medium.url} />
                <ul>
                    <img alt="Channel Thumbnail" className="rounded-full w-[40px] h-[40px]" src={channelinfo?.snippet?.thumbnails?.default?.url} />

                    <li className="font-bold  truncate-2-lines">{title}</li>
                    <li className="text-gray-600">{channelTitle}</li>
                    <div className="flex items-center gap-x-1">
                        <li className='text-gray-600'>{countToDisplaycount(viewCount)} views</li>
                        <li className="pb-2  text-xl font-bold text-gray-600 ">.</li>
                        <li className="text-gray-600">{formatPublishedDate(publishedAt)}</li>
                    </div>

                </ul>

            </div>
        </>
    )
}

export default VideoCard