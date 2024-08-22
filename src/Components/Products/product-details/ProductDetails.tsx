import ProductGallery from "./ProductGallery"
import ProductText from "./ProductText"


function ProductDetails() {
    return (
            <div className='container py-5'>
                <div className='flex flex-col lg:flex-row gap-10 items-center'>
                    <div className='w-11/12 lgg:w-6/12  h-9/12 lgg:h-96 rounded-lg'>
                        <ProductGallery />
                    </div>
                    <div className='rounded-lg w-11/12'>
                        <ProductText />
                    </div>
                </div>
            </div>
    )
}

export default ProductDetails