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

export interface ICategory {
    name: string;
    slug: string;
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoriesResponse {
    results: number;
    data: ICategory[];
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
}