import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
    return (
        <div className="col-span-11  overflow-y-auto m-2">
            <ButtonList />
            <VideoContainer />
        </div>
    );
};

export default MainContainer;
