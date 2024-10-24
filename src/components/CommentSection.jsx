const commentsData = [
    {
        name: "Rohit Kumar",
        text: "lorem ipsum dolor sit amet",
        replies: [
            {
                name: "Rohit Kumar",
                text: "lorem ipsum dolor sit amet",
                replies: [],
            },
        ],
    },
    {
        name: "Rohit Kumar",
        text: "lorem ipsum dolor sit amet",
        replies: [
            {
                name: "Rohit Kumar",
                text: "lorem ipsum dolor sit amet",
                replies: [
                    {
                        name: "Rohit Kumar",
                        text: "lorem ipsum dolor sit amet",
                        replies: [
                            {
                                name: "Rohit Kumar",
                                text: "lorem ipsum dolor sit amet",
                                replies: [
                                    {
                                        name: "Rohit Kumar",
                                        text: "lorem ipsum dolor sit amet",
                                        replies: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Rohit Kumar",
        text: "lorem ipsum dolor sit amet",
        replies: [],
    },
    {
        name: "Rohit Kumar",
        text: "lorem ipsum dolor sit amet",
        replies: [],
    },
    {
        name: "Rohit Kumar",
        text: "lorem ipsum dolor sit amet",
        replies: [],
    },
];

const Comment = ({ data }) => {
    const { name, text } = data;

    return (
        <div className="flex shadow-sm bg-gray-100 p-2 my-2 rounded-lg ">
            <img
                className="w-12 h-12"
                alt="user"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            />
            <div className="px-3">
                <p className="font-bold">{name}</p>
                <p>{text}</p>
            </div>
        </div>
    );
};

const CommentsList = ({ comments }) => {
    return comments.map((comment, index) => (
        <div key={index}>
            <Comment data={comment} />
            {comment.replies.length > 0 && (
                <div className="pl-5  ml-5 border border-l-black">
                    <CommentsList comments={comment.replies} />
                </div>
            )}
        </div>
    ));
};

const CommentSection = () => {
    return (
        <div className="m-5 p-2">
            <h1 className="text-2xl font-bold">Comments:</h1>
            <CommentsList comments={commentsData} />
        </div>
    );
};

export default CommentSection;
