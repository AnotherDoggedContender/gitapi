import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
    name: "currentPage",
    initialState: {
        value: 1,
    },
    reducers: {
        setCurrentPage: (state, parameter) => {
            state.value = parameter.payload;
        },
    },
});
export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
