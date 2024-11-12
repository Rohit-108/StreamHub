
const ShimmerCard = () => {
    return (
        <div >
            <div className='w-[300px] h-[200px] p-2  rounded-lg bg-gray-300  '></div>
            <div className='flex  pt-2 text-center gap-x-3 pr-6'>
                <div className='w-9 h-9  rounded-full bg-gray-300'></div>
                <div className="flex flex-col gap-y-2 ">
                    <div className='w-[230px] h-4 bg-gray-300  '></div>
                    <div className='w-[190px] h-4 bg-gray-300  '></div>
                </div>
            </div>


        </div>

    )
}

const Shimmer = () => {

    const arr = Array.from({ length: 50 });

    return (
        <div className="flex flex-wrap gap-4  w-12/12 m-2  md:ml-[90px] ml-[45px] ">
            {arr.map((__, index) => (
                <ShimmerCard key={index} />
            ))}
        </div>
    )
}

export default Shimmer