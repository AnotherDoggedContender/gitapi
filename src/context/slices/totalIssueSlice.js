import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;

export const fetchTotalIssue = createAsyncThunk("fetchTotalIssue", async () => {
    try {
        const response = await fetch(
            `https://api.github.com/search/issues?q=repo:angular/angular-cli+is:issue`,
            {
                headers: {
                    Accept: "application/vnd.github + json",
                    Authorization: `Bearer ${githubAPIToken}`,
                },
            }
        );
        const result = await response.json();
        return result.total_count;
    } catch (error) {
        console.log(error);
    }
});

export const totalIssueSlice = createSlice({
    name: "totalIssue",
    initialState: { status: "", totalIssueCount: null },
    extraReducers: (builder) => {
        builder.addCase(fetchTotalIssue.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchTotalIssue.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.totalIssueCount = action.payload;
        });
        builder.addCase(fetchTotalIssue.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.status, action.payload);
        });
    },
});

export default totalIssueSlice.reducer;
