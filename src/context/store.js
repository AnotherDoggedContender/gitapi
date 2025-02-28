import { configureStore } from "@reduxjs/toolkit";
import issueListReducer from "./slicers/issueListSlices";
import currentPageReducer from "./slicers/currentPageSlices";
export const store = configureStore({
    reducer: {
        issueList: issueListReducer,
        currentPage: currentPageReducer,
    },
});
