
function DashBoardHeader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5  p-2 mt-5">
            <div className="flex items-start justify-between  border-2 py-3 px-5 rounded-lg bg-zinc-100">
                <div className="">
                    <h6 className="text-2xl font-bold capitalize">
                        users
                    </h6>
                    <div className="mt-3">
                        <i className="fa-regular fa-circle-user"></i> <span className="text-md text-zinc-600"> 4894</span>
                    </div>
                </div>
                <span className="text-lg py-1 px-2 border-2 text-white bg-blue-700 rounded-md"><i className="fa-regular fa-user"></i></span>
            </div>

            <div className="flex items-start justify-between border-2 py-3 px-5 rounded-lg bg-zinc-100">
                <div className="">
                    <h6 className="text-2xl font-bold capitalize">
                        products
                    </h6>
                    <div className="mt-3">
                        <i className="fa-solid fa-arrow-up-1-9"></i> <span className="text-lg text-zinc-600"> 4894</span>
                    </div>
                </div>
                <span className="text-lg py-1 px-2 border-2 text-white bg-blue-700 rounded-md"><i className="fa-solid fa-arrow-trend-up"></i></span>
            </div>

            <div className="flex items-start justify-between border-2 py-3 px-5 rounded-lg bg-zinc-100">
                <div className="">
                    <h6 className="text-2xl font-bold capitalize">
                        categories
                    </h6>
                    <div className="mt-3">
                        <i className="fa-solid fa-layer-group"></i> <span className="text-md text-zinc-600"> 4894</span>
                    </div>
                </div>
                <span className="text-lg py-1 px-2 border-2 text-white bg-blue-700 rounded-md"><i className="fa-solid fa-list"></i></span>
            </div>

            <div className="flex items-start justify-between border-2 py-3 px-5 rounded-lg bg-zinc-100">
                <div className="">
                    <h6 className="text-2xl font-bold capitalize">
                        brands
                    </h6>
                    <div className="mt-3">
                        <i className="fa-solid fa-copyright"></i> <span className="text-md text-zinc-600"> 4894</span>
                    </div>
                </div>
                <span className="text-lg py-1 px-2 border-2 text-white bg-blue-700 rounded-md"><i className="fa-regular fa-copyright"></i></span>
            </div>

        </div>)
}

export default DashBoardHeader