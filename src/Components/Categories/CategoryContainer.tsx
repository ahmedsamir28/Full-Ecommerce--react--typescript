import CategoryCard from './CategoryCard'; // تأكد من مسار الاستيراد الصحيح

function CategoryContainer() {
    return (
        <div>
            <h3 className="text-3xl font-semibold mb-4 border-b-2 w-fit pb-2 mx-auto">All Categories</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>
    );
}

export default CategoryContainer;
