/* eslint-disable react/prop-types */
const VideoCard = ({ info }) => {


    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails, publishedAt } = snippet;


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


    return (
        <>
            <div className="p-2 m-2 w-72 shadow-lg ">
                <img className="rounded-lg" alt="Videos" src={thumbnails.medium.url} />
                <ul>
                    <li className="font-bold py-2">{title}</li>
                    <li className="">{channelTitle}</li>
                    <div className="flex items-center gap-x-1">
                        <li>{(statistics.viewCount / 1000000).toFixed(2)}M views</li>
                        <li className="pb-2  text-xl font-bold ">.</li>
                        <li>{formatPublishedDate(publishedAt)}</li>
                    </div>

                </ul>

            </div>
        </>
    )
}

export default VideoCard