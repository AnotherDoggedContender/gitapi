import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
    name: "currentPage",
    initialState: {
        value: 1,
    },
    reducers: {
        setCurrentPage: (state, parameter) => {
            state.value = parameter.payload; //parameter.payload에 저장할 값이 들어있음
        },
    },
});
export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
