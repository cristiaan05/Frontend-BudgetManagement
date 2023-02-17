import { createSlice } from "@reduxjs/toolkit";

// export const logInAsync = createAsyncThunk(
//     'auth/logInAsync',
//     async () => {
//         try {
//             const response = await fetch('http://localhost:3000/app/signIn', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password
//                 })
//             });
//             const responseJson=await response.json();
//             return {email:responseJson.token,isAuth:true}
//         } catch (error) {
//             console.log(error);
//              return {email:null,isAuth:false}
//         }
//     }
// )

const initialState = {
    isAuth: false,
    email: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            //console.log(action);
            state.isAuth = true;
            state.email = action.payload.email;

        },
        logOut: (state, action) => {
            state.isAuth = false;
            state.email = null;
        }
    },
    // extraReducers:{
    //     [logInAsync.fulfilled]:(state,action)=>{
    //         state.isAuth = action.payload.isAuth;
    //         state.email = action.payload.email;
    //     }
    // }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;