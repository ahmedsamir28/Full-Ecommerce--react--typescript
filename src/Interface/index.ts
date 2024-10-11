export interface IRegisterInput {
    name: "name" | "email" | "phone" | "password" | "passwordConfirm";
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
    ratingsAverage: number
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
        ratingsAverage: number
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
}
export interface UserData {
    _id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
    role: string;
    active: boolean;
    wishlist: [];
    addresses: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
    passwordChangedAt: string
}

export interface UserJwtDataResponse {
    data: UserData;
    token: string;
}

export interface LoggedUser {
    data: {
        active: boolean;
        addresses: [];
        createdAt: string;
        email: string;
        name: string;
        password: string;
        passwordChangedAt: string;
        phone: string;
        role: string;
        slug: string;
        updatedAt: string;
        wishlist: [];
        __v: number;
        _id: string;
    };
}

export interface IReview {
    data: {
        _id: string;
        review: string;
        rating: number;
        user: {
            _id: string;
            name: string;
        };
        product: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
}

export interface IReviewResponse {
    results: number;
    paginationResult: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: {
        _id: string;
        review: string;
        rating: number;
        user: {
            _id: string;
            name: string;
        };
        product: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

export interface ILoggedUserWishlist {
    status: string;
    data: IProduct[];
}


// Interface for each address item
export interface Address {
    alias: string;
    details: string;
    phone: string;
    city: string;
    postalCode: string;
    _id: string;
}

// Interface for the entire response structure
export interface AddressResponse {
    results: number;
    status: string;
    data: Address[];
}

// Interface for pagination information
interface PaginationResult {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

// Interface for the structure of a single coupon
export interface Coupon {
    _id: string;
    name: string;
    expire: string
    discount: number;
    createdAt: string;
    updatedAt: string;
}

// Interface for handling the response with multiple coupons and pagination
export interface CouponResponse {
    results: number;
    paginationResult: PaginationResult;
    data: Coupon[];
}

// Interface for handling the response with a single coupon
export interface SpecificCouponResponse {
    data: Coupon;
}


// Define the interfaces
interface Category {
    name: string;
}

interface Brand {
    name: string;
}

interface Product {
    _id: string;
    title: string;
    imageCover: string;
    category: Category
    brand: Brand;
}

export interface CartItem {
    product: Product;
    numOfCartItems: number;
    count: number,
    color: string,
    price: number,
    _id: string;
}

interface CartData {
    products: CartItem[];
    totalCartPrice: number
    totalAfterDiscount: number
    _id: string
}

export interface CartResponse {
    status: string;
    numOfCartItems: number;
    data: CartData;
}

// Interface for Shipping Address
interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
    postalCode: string;
}

// Interface for Product Details
export interface ProductOrder {
    _id: string;
    title: string;
    imageCover: string;
    ratingsQuantity: number;
    ratingsAverage?: number | undefined; // Optional as some products don't have ratingsAverage
    id: string;
}

// Interface for Cart Item
export interface CartItems {
    product: ProductOrder;
    count: number;
    color: string;
    price: number;
    _id: string;
}

// Interface for User Details
interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

// Interface for Order Data
export interface Order {
    shippingAddress: ShippingAddress;
    _id: string;
    user: User;
    cartItems: CartItems[];
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    updatedAt: string;
    id: number;
}

export interface specificOrder {
    data: Order
}


// Interface for Pagination Information
interface PaginationResult {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}

// Main Interface for the Response
export interface ordersResponse {
    results: number;
    paginationResult: PaginationResult;
    data: Order[];
}
