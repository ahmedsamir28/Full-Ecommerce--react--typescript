import AdminProductCard from "./AdminProductCard"

function AdminProducts() {
    return (
        <div className='container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 p-2 mt-5'>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
            <AdminProductCard/>
        </div>
        )
}

export default AdminProducts