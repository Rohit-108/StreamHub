const ChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-center shadow-sm p-2 rounded-lg">
            <img
                className="h-8 w-8 rounded-full mr-2"
                alt="user"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            />
            <span className="font-bold text-gray-800 px-2">{name}</span>
            <span className="text-gray-700">{message}</span>
        </div>
    );
};

export default ChatMessage;
