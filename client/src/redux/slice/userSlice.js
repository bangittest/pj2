import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { instance } from "../../api/axios"


export const getUser = createAsyncThunk("getUser", async (search) => {

    if (search) {
        const response = await instance.get(`/users?_sort=id&_order=desc&email_like=${search}`);
        return response.data;
    } else {
        const response = await instance.get(`/users?_sort=id&_order=desc`);
        return response.data;
    }

});

// export const getUser = createAsyncThunk("getUser", async () => {
//     const response = await instance.get("/users")
//     return response.data
// })


export const changeActiveUser = createAsyncThunk("changeActiveUser", async (users) => {
    const { id, ...data } = users
    const response = await instance.patch(`/users/${users.id}`, {
        active: !data.active
    })
    return id
})


const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        mess: "no mess",
        isLoadingGet: false,
        isLoadingChange: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingGet: true
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    mess: "ok",
                    data: action.payload,
                    isLoadingGet: false
                }
            })
            .addCase(getUser.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingGet: false
                }
            })
            .addCase(changeActiveUser.pending, (state) => {
                return {
                    ...state,
                    mess: "pending",
                    isLoadingChange: true
                }
            })
            .addCase(changeActiveUser.fulfilled, (state) => {
                return {
                    ...state,
                    mess: "oke",
                    isLoadingChange: false
                }
            })
            .addCase(changeActiveUser.rejected, (state) => {
                return {
                    ...state,
                    mess: "no",
                    isLoadingChange: false
                }
            })

    }
})

export default userSlice.reducer