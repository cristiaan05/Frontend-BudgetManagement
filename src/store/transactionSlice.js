import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('usertoken');
//console.log(token)
export const getTransactionsByUser = createAsyncThunk(

    'auth/getTransactions',
    async () => {
        try {
            const response = await fetch('http://localhost:3000/app/getTransactions', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `authorization=${token}`
                },
            });
            const responseJson = await response.json();
            return { transactions: responseJson.transactions }
        } catch (error) {
            console.log(error);
            return { transactions: null }
        }
    }
)


export const getTransactionsByFilters = createAsyncThunk(

    'auth/getTransactionsFilter',
    async (filterData,{rejectWithValue}) => {
        //const {id_bank_account,category,startDate,endDate}=filterData
        //console.log(filterData)
        try {
            const response = await fetch('http://localhost:3000/app/getHistory', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `authorization=${token}`
                },
                body: JSON.stringify(filterData) ,
            });
            const responseJson = await response.json();
            console.log(responseJson)
            return { transactions: responseJson.transactions }
        } catch (error) {
            console.log(error);
            return rejectWithValue(filterData)
        }
    }
)


const initialState = {
    transactions: null,
}

export const transactionSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
        getTransactions: (state, action) => {
            console.log(action);
            state.transactions = action.payload.transactions;

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getTransactionsByFilters.fulfilled, (state, action) => {
            //state.statusByName[action.meta.arg] = 'fulfilled'
            state.transactions = action.payload.transactions
          })
        // [getTransactionsByUser.fulfilled]: (state, action) => {
        //     state.transactions = action.payload.transactions;
        // },
        // [getTransactionsByFilters.fulfilled]: (state, action) => {
        //     state.transactions = action.payload.transactions;
        // }
    }
});

export const { getTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;