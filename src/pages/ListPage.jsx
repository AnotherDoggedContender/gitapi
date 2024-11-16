import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slicers/issueListSlices";
import { useEffect, useState } from "react";
export const ListPage = () => {
    const { issueListStatus, issueList } = useSelector((state) => {
        console.log("ListPageState", state.issueList);
        return state.issueList;
    });
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            dispatch(fetchIssueList());
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(issueList[0]);
    return issueList.map((issue) => {
        return <div>{issue.url}</div>;
    });
};
