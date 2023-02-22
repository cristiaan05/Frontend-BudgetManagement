import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('usertoken');
//console.log(token)
export const getAccountsByUser = createAsyncThunk(

    'auth/getAccounts',
    async () => {
        try {
            const response = await fetch('http://localhost:3000/app/getAccounts', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `authorization=${token}`
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
    account_name:null,
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
    extraReducers:(builder)=>{
        builder.addCase(getAccountsByUser.fulfilled,(state,action)=>{
            state.accounts = action.payload.accounts;
        })

        // [getAccountsByUser.fulfilled]:(state,action)=>{
            
        // }
    },
});

export const { getAccounts } = accountSlice.actions;
export default accountSlice.reducer;