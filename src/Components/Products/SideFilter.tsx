import { ChangeEvent, useState } from 'react';
import { IData, IDataResponse } from '../../Interface';

interface ISideFilterData {
    brands: IDataResponse | undefined
    isBrandLoading: boolean
    isBrandError: boolean
    categories: IDataResponse | undefined
    isCategoryLoading: boolean
    isCategoryError: boolean
    clickCategory: (e: ChangeEvent<HTMLInputElement>) => void;
    clickBrand: (e: ChangeEvent<HTMLInputElement>) => void;


}
const SideFilter = ({ brands, isBrandLoading, isBrandError, categories, isCategoryLoading, isCategoryError, clickCategory, clickBrand }: ISideFilterData) => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <>
            <div className="w-80 pl-5 pt-2">
                <div
                    className="flex justify-between items-center  cursor-pointer border-b-2 pb-2"
                    onClick={toggleCollapse}
                >
                    <strong >Refine Search</strong>
                    <span className={`transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}><i className="fa-solid fa-chevron-up"></i></span>
                </div>
                <div
                    className={`transition-max-height ease-out duration-300 overflow-hidden ${!isCollapsed ? 'max-h-0' : 'max-h-screen'
                        }`}>

                    <h3 className='text-lg font-bold text-zinc-500 capitalize mt-5 mb-2  '>category</h3>
                    <div className=" flex items-center justify-start gap-2 mb-2 ">
                        <input
                            className="h-[1.125rem] w-[1.125rem] cursor-pointer "
                            type="checkbox"
                            value="0"
                            id="checkboxDefault" />
                        <label
                            className="capitalize text-sm text-zinc-500"
                        >
                            all
                        </label>
                    </div>


                    {!isCategoryLoading && !isCategoryError && categories?.data.map((category: IData) => (
                        <div key={category._id} className="flex items-center justify-start gap-2 mb-2">
                            <input
                                onChange={clickCategory}
                                value={category._id}
                                id={`category-${category._id}`}
                                className="h-[1.125rem] w-[1.125rem] cursor-pointer"
                                type="checkbox"
                            />
                            <label
                                htmlFor={`category-${category._id}`}
                                className="capitalize text-sm text-zinc-500"
                            >
                                {category.name}
                            </label>
                        </div>
                    ))}

                    <h3 className='text-lg font-bold text-zinc-500 capitalize mt-5 mb-2  '>brands</h3>
                    <div className=" flex items-center justify-start gap-2 mb-2 ">
                        <input
                            className="h-[1.125rem] w-[1.125rem] cursor-pointer"
                            type="checkbox"
                            value="0"
                            id="checkboxDefault" />
                        <label
                            className="capitalize text-sm text-zinc-500"
                        >
                            all
                        </label>
                    </div>


                    {!isBrandLoading && !isBrandError && brands?.data.map((brand: IData) => (
                        <div key={brand._id} className="flex items-center justify-start gap-2 mb-2">
                            <input
                                onChange={clickBrand}
                                value={brand._id}
                                id={`category-${brand._id}`}
                                className="h-[1.125rem] w-[1.125rem] cursor-pointer"
                                type="checkbox"
                            />
                            <label
                                htmlFor={`category-${brand._id}`}
                                className="capitalize text-sm text-zinc-500"
                            >
                                {brand.name}
                            </label>
                        </div>
                    ))}


                    <h3 className='text-lg font-bold text-zinc-500 capitalize mt-5 mb-2  '>price</h3>
                    <div className=" flex items-center justify-start gap-2  mb-2 ">
                        <span
                            className="capitalize text-sm text-zinc-500"
                        >
                            from :
                        </span>
                        <input
                            type="number"
                            className='border-2 rounded-md pl-2 outline-none'
                            style={{ width: "50px", height: "25px" }} />
                    </div>
                    <div className=" flex items-center justify-start gap-2 mb-2 ">
                        <span
                            className="capitalize text-sm text-zinc-500"
                        >
                            to :
                        </span>
                        <input
                            type="number"
                            className='border-2 rounded-md pl-2 outline-none'
                            style={{ width: "50px", height: "25px" }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideFilter;
