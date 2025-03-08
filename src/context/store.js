import { configureStore } from "@reduxjs/toolkit";
import issueListReducer from "./slices/issueListSlices";
import currentPageReducer from "./slices/currentPageSlices";
import totalIssueReducer from "./slices/totalIssueSlice";
export const store = configureStore({
    reducer: {
        issueList: issueListReducer,
        totalIssue: totalIssueReducer,
        currentPage: currentPageReducer,
    },
});
