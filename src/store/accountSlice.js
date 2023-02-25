import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useCookies } from 'react-cookie';

const token = localStorage.getItem('usertoken');
const [cookies] = useCookies(['usertoken']);
// console.log(token)
// console.log(localStorage)
export const getAccountsByUser = createAsyncThunk(

    'auth/getAccounts',
    async () => {
        try {
            console.log(cookies.usertoken)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/app/getAccounts`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `usertoken=${cookies.usertoken}`
                },
            });
            const responseJson = await response.json();
            return { accounts: responseJson.accounts }
        } catch (error) {
            console.log(error);
            return { accounts: null }
        }
    }
)


const initialState = {
    accounts: null,
    account_name: null,
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: initialState,
    reducers: {
        getAccounts: (state, action) => {
            console.log(action);
            state.accounts = action.payload.accounts;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAccountsByUser.fulfilled, (state, action) => {
            state.accounts = action.payload.accounts;
        })

        // [getAccountsByUser.fulfilled]:(state,action)=>{

        // }
    },
});

export const { getAccounts } = accountSlice.actions;
export default accountSlice.reducer;