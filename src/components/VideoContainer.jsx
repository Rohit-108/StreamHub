import { useEffect } from "react"
import { GOOGLE_API_KEY } from "./utills/constant";

const VideoContainer = () => {


    useEffect(() => {
        getVideos();
    }, [])

    const getVideos = async () => {
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=" + GOOGLE_API_KEY);
        const json = await data.json()
        console.log(json)
    };
    fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=' + GOOGLE_API_KEY)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Handle the data
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });


    return (
        <div>VideoContainer</div>
    )
}

export default VideoContainer