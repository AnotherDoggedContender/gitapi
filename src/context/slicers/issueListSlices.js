import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;

export const fetchIssueList = createAsyncThunk("fetchIssueList", async () => {
    const response = await fetch(
        `https://api.github.com/repos/angular/angular-cli/issues`,
        {
            headers: {
                Accept: "application/vnd.github + json",
                Authorization: `Bearer ${githubAPIToken}`,
            },
        }
    );
    const result = await response.json();
    return result;
});
export const issueListSlice = createSlice({
    name: "issueList",
    initialState: { status: "", issueList: [] },
    reducers: {
        setIssueList: (state, response) => {
            state.value = response;
        },
        print: (state) => {
            console.log(JSON.stringify(state));
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
