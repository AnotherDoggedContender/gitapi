// owner, repos 변수
// 1. ListPage 혹은 LandingPage에서 검색창으로 owner와 repos에 들어갈 문자열을 받는다.
// 2. 1의 내용을 fetchIssueList함수에 전달한다.
// 3. fetch에서 주소창에 받은 변수를 집어넣는다.
// 4. 두 변수는 ListPage에 출력되어야 한다.
// 5. 두 변수가 변하면 페이지 출력도 변하므로 전역 상태로 관리해야 한다.
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
