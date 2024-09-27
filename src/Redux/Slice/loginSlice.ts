import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from '../action';
import { UserJwtDataResponse } from '../../Interface';

// Define a type for the slice state
interface loginState {
    loading: boolean;
    user: UserJwtDataResponse | null; // Replace 'any' with your user data type
    error: string | null;
}

// Get user data from local storage if it exists
const user = localStorage.getItem('user');

// Define the initial state using that type
const initialState: loginState = {
    loading: false,
    user: user ? JSON.parse(user) : null,
    error: null,
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // assuming the user data is the response data
                localStorage.setItem('user', JSON.stringify(action.payload.data));
                localStorage.setItem('token', JSON.stringify(action.payload.token));
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload as string;
            });
    },
});



export const authSelector = ({ login }: RootState) => login;

export default loginSlice.reducer;
