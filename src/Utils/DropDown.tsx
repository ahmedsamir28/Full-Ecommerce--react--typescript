
function DropDown() {
  return (
    <div className="flex items-center justify-between">
      <div className='capitalize text-zinc-700 font-semibold'> 20 products available now</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 ">Click</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow border-2">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    </div>
  )
}

export default DropDown