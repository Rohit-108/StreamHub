import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
    return (
        <div className="col-span-11 p-4 sm:p-6 md:p-8 lg:p-10">
            <ButtonList />
            <VideoContainer />
        </div>
    );
};

export default MainContainer;
