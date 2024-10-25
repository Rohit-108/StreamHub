export const GOOGLE_API_KEY = "AIzaSyBR5RFg_GcD_CWmeYhVDSmZUPgyswJxVQ4"

export const YOUTUBE_VIDEOS_API = " https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + GOOGLE_API_KEY



export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q="

export const YOUTUBE_COMMENT_API = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId="


export const OFFSET_LIVE_CHAT = 25


export const formatPublishedDate = (dateString) => {
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