import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../Config/Base_Url';


// Create async thunk for user login
export const authLogin = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axiosInstance.post('api/v1/auth/login', credentials);
        return response.data; // assuming the token is part of the response data
    } catch (error) {
        console.error('API error:', error);
        return rejectWithValue(error);
    }
}

);

// Create async thunk for user register
export const authRegister = createAsyncThunk('auth/register', async (credentials: { name: string; email: string; phone: string; password: string; passwordConfirm: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axiosInstance.post('api/v1/auth/signup', credentials);
        return response.data; // assuming the token is part of the response data
    } catch (error) {
        console.error('API error:', error);
        return rejectWithValue(error);
    }
}
);



