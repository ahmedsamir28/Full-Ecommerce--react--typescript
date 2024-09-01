import { useGetCategoriesQuery } from '../../Redux/RTK Query/categories_slice';
import CategoryCard from './CategoryCard';
import { IData } from '../../Interface';

function CategoryContainer() {
    const { data, isError, isLoading } = useGetCategoriesQuery();

    return (
        <div>
            <h3 className="text-3xl font-semibold mb-4 border-b-2 w-fit pb-2 mx-auto">All Categories</h3>
            {!isLoading && isError && <p className="text-center text-error" >There is no data</p>}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
                {!isLoading &&
                    !isError &&
                    data &&
                    data.data.map((category: IData) => (
                        <CategoryCard key={category._id} category={category} isLoading={isLoading} />
                    ))}
            </div>
        </div>
    );
}

export default CategoryContainer;
