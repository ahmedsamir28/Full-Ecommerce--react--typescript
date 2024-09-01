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

export interface IData {
    name: string;
    slug: string;
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IDataResponse {
    results: number;
    data: IData[];
    paginationResult: {
        currentPage: number;
        limit: number;
        numberOfPages: number;
    };
}