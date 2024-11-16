import { configureStore } from "@reduxjs/toolkit";
import issueListReducer from "./slicers/issueListSlices";
export const store = configureStore({
    reducer: {
        issueList: issueListReducer,
    },
});
