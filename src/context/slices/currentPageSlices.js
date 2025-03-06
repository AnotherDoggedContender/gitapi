import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
    name: "currentPage",
    initialState: {
        value: 1,
    },
    reducers: {
        setCurrentPage: (state, parameter) => {
            const history = window.history;
            state.value = parameter.payload; //parameter.payload에 저장할 값이 들어있음
            history.pushState({}, "", `?currentPage=${parameter.payload}`);
            console.log("currentPage:", parameter.payload);
            console.log("url:", history);
        },
    },
});
export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
