// owner, repos 전역 상태
// 1. ListPage 혹은 LandingPage에서 owner, repos를 받는다.
// 2. 받은 문자열을 fetchIssueList의 매개변수로 전달받는다.
// 3. 매개변수를 주소창으로 전달한다.
// 4. 이 상태는 header.jsx에서 꺼낼 수 있어야 한다.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;
export const owner = "";

export const fetchIssueList = createAsyncThunk(
    "fetchIssueList",
    async (currentPage) => {
        try {
            const response = await fetch(
                `https://api.github.com/repos/angular/angular-cli/issues?per_page=50&page=${currentPage}`,
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
