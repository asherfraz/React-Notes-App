import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser(state) {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("notes");
        },
        updateUser(state, action) {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };

                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { addUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
