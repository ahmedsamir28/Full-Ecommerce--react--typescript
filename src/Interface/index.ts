export interface IRegisterInput {
    name: "username" | "email" | "password";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    };
}

export interface ILoginInput {
    name: "email" | "password";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    };
}

// interface of categories & brands
export interface IData {
    name: string;
    slug: string;
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
// interface of categories & brands
export interface IDataResponse {
    results: number;
    data: IData[];
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
}


//interface of subCategories
export interface ISubCategory {
    name: string;
    slug: string;
    category: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
//interface of subCategories
export interface ISubCategories {
    results: number;
    data: ISubCategory[];
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
}

export interface IProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    sold: number;
    price: number;
    priceAfterDiscount: number
    availableColors: string[];
    imageCover: string;
    images: string[];
    category: string;
    subcategory: string[];
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IProducts {
    results: number;
    data: IProduct[];
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
}

export interface IProductDetails {
    data: {
        _id: string;
        title: string;
        slug: string;
        description: string;
        quantity: number;
        sold: number;
        price: number;
        priceAfterDiscount: number;
        availableColors: string[];
        imageCover: string;
        images: string[];
        category: string;
        subcategory: string[];
        ratingsQuantity: number;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}


