import {createAsyncThunk} from "@reduxjs/toolkit";
import {login, logout, updateUser} from "./user-service";

export const loginThunk = createAsyncThunk(
    'login',
    async (user) => await login(user) 
)

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const updateUserThunk = createAsyncThunk(
    'updateUser',
    async ({uid, updateInfo}) => await updateUser(uid, updateInfo)
)