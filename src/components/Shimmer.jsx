
const ShimmerCard = () => {
    return (
        <div className="m-1 rounded-lg w-[500px] md:w-[400px]">
            <div className="w-[400px] h-[225px] rounded-lg bg-gray-300"></div>
            <div className="flex pt-2">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="w-[352px] mx-2 flex flex-col gap-y-2">
                    <div className="w-full h-4 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                    <div className="flex items-center space-x-2">
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                        <div className="w-4 h-4 bg-gray-300 rounded"></div>
                        <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const Shimmer = () => {

    const arr = Array.from({ length: 50 });

    return (
        <div className="flex flex-wrap">
            {arr.map((__, index) => (
                <ShimmerCard key={index} />
            ))}
        </div>
    )
}

export default Shimmer