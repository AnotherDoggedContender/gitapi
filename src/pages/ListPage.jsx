import { useDispatch, useSelector } from "react-redux";
import { print, fetchData } from "../context/slicers/issueListSlices";
export const ListPage = () => {
    // const issueList = useSelector((state) => state.issueList.value);
    // const dispatch = useDispatch();
    // dispatch(print());
    // issueList
    const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;
    console.log(githubAPIToken);
    const fetchData = async () => {
        const response = await fetch(`https://api.github.com/issues`, {
            headers: {
                Accept: "application/vnd.github + json",
                Authorization: `Bearer ${githubAPIToken}`,
            },
        });
        const result = await response.json();
        console.log(result);
    };
    fetchData();
    return <div>목록 페이지</div>;
};
