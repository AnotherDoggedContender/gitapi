import { createSlice } from "@reduxjs/toolkit";
const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;
const userName = "alan-agius4";
export const issueListSlice = createSlice({
    name: "issueList",
    initialState: [],
    reducers: {
        fetchData: async (state) => {
            const response = await fetch(`https://api.github.com/issues`, {
                headers: {
                    Accept: "application/vnd.github + json",
                    Authorization: `Bearer ${githubAPIToken}`,
                },
            });
            const result = await response.json();
            state.value = result;
        },
        print: (state) => {
            console.log(JSON.parse(JSON.stringify(state)));
        },
    },
});

export const { fetchData, print } = issueListSlice.actions;

export default issueListSlice.reducer;
