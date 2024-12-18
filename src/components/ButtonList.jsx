import Button from "./Button";

const ButtonList = () => {
    const buttonNames = ["All", "Music", "Live", "Songs", "Gaming", "Soccer", "Cricket", "Cooking"];

    return (
        <div className="flex flex-wrap">
            {buttonNames.map((name, index) => (
                <Button key={index} name={name} />
            ))}
        </div>
    );
};

export default ButtonList;
