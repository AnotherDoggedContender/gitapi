import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;
const fetchURL = `https://api.github.com/repos/angular/angular-cli/issues`;
export const fetchIssueList = createAsyncThunk(
    "fetchIssueList",
    async (currentPage) => {
        try {
            const response = await fetch(
                `${fetchURL}?per_page=10&page=${currentPage}&state:open`,
                {
                    headers: {
                        Authorization: `Bearer ${githubAPIToken}`,
                    },
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    }
);

export const issueListSlice = createSlice({
    name: "issueList",
    initialState: { status: "", issueList: [] },
    reducers: {
        print: (state) => {
            console.log(JSON.stringify(state));
        },
        returnFetchURL: () => {
            return fetchURL;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIssueList.pending, (state, action) => {
            state.status = "pending";
        });
        builder.addCase(fetchIssueList.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.issueList = action.payload;
        });
        builder.addCase(fetchIssueList.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.status, action.payload);
        });
    },
});

export const { print } = issueListSlice.actions;

export default issueListSlice.reducer;
