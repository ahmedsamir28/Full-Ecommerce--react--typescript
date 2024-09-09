interface sortData {
  sortData: (type: string) => void;  // Now it expects a string argument
}

function DropDown({ sortData }: sortData) {
  return (
    <div className="flex items-center justify-between">
      <div className='capitalize text-zinc-700 font-semibold'> 20 products available now</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 capitalize"> Sort By
          <span className=" w-2">
            <i className="text-zinc-700 fa-solid fa-arrow-down-short-wide"></i>
          </span>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border-2 cursor-pointer">
          <li onClick={() => sortData("")} className="capitalize py-2 hover:bg-zinc-100 pl-3 rounded-lg">Without order</li>
          <li onClick={() => sortData("best seller")} className="capitalize py-2 hover:bg-zinc-100 pl-3 rounded-lg">best seller</li>
          <li onClick={() => sortData("top rated")} className="capitalize py-2 hover:bg-zinc-100 pl-3 rounded-lg">top rated</li>
          <li onClick={() => sortData("Price from low to high")} className="capitalize py-2 hover:bg-zinc-100 pl-3 rounded-lg">Price from low to high</li>
          <li onClick={() => sortData("Price from high to low")} className="capitalize py-2 hover:bg-zinc-100 pl-3 rounded-lg">Price from high to low</li>
        </ul>

      </div>
    </div>
  )
}

export default DropDown