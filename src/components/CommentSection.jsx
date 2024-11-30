import { YOUTUBE_COMMENT_API, GOOGLE_API_KEY } from "./utills/constant";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatPublishedDate } from "./utills/constant";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";

const Comment = ({ data }) => {
    const { authorDisplayName, textDisplay, authorProfileImageUrl, likeCount, updatedAt } = data.snippet.topLevelComment.snippet;

    return (
        <div className="flex   p-2 my-2 lg:w-[70%]  ">
            <img className="w-12 h-12 rounded-full" alt="user" src={authorProfileImageUrl} />
            <div className="px-3">
                <div className="flex gap-x-2">
                    <p className="font-bold">{authorDisplayName}</p>
                    <p>{formatPublishedDate(updatedAt)}</p>
                </div>
                <p>{textDisplay ? textDisplay : 'This comment is not available!'}</p>
                <div className="flex items-center gap-x-4">
                    <p className="text-gray-600 flex items-center gap-y-2 font-semibold">
                        <AiTwotoneLike className="inline-block" />
                    </p>
                    <p>{likeCount} </p>
                    <p className="text-gray-600 flex items-center gap-y-2 font-semibold">
                        <AiTwotoneDislike className="inline-block" /></p>
                </div>

            </div>
        </div>
    );
};

const CommentsList = ({ comments }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <div key={index}>
                    <Comment data={comment} />
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="pl-5 ml-5 gap-y-2 lg:w-[70%] ">
                            <CommentsList comments={comment.replies} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const CommentSection = () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("v");
    const [commentData, setCommentData] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${YOUTUBE_COMMENT_API}${videoId}&key=${GOOGLE_API_KEY}`);
            const json = await response.json();
            setCommentData(json.items || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        if (videoId) {
            fetchComments();
        }
    }, [videoId]);

    return (
        <div className="m-5 p-2">

            <h1 className="text-2xl font-bold">Comments:</h1>
            {commentData.length > 0 ? (
                <CommentsList comments={commentData} />
            ) : (
                <p>No comments available.</p>
            )}
        </div>
    );
};

export default CommentSection;
