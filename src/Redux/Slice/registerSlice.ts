import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import { authRegister } from '../action';
import { UserJwtDataResponse } from '../../Interface';

// Define a type for the slice state
interface registerState {
    loading: boolean;
    user: UserJwtDataResponse | null; // Replace 'any' with your user data type
    error: string | null;
}



// Define the initial state using that type
const initialState: registerState = {
    loading: false,
    user: null,
    error: null,
};


const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        //     state.loading = false;
        //     state.error = null;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authRegister.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // assuming the user data is the response data
                state.error = null;
                console.log('Fulfilled action payload:', action.payload);
            })
            .addCase(authRegister.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload as string;
                console.error('Rejected action payload:', action.payload);
            });
    },
});


// export const { logout } = registerSlice.actions;

export const authSelector = ({ register }: RootState) => register;

export default registerSlice.reducer;
