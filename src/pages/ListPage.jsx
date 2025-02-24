import { PageIndex } from "../components/PageIndex";
import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slicers/issueListSlices";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

export const ListPage = () => {
    const { issueList } = useSelector((state) => {
        console.log("ListPageState", state);
        return state.issueList;
    });
    const [totalIssue, setTotalIssue] = useState();
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            dispatch(fetchIssueList());
        } catch (error) {
            console.log(error);
        }
    };
    const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;

    const fetchTotalIssue = async () => {
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
    };

    useEffect(() => {
        fetchData();
        const handleTotalIssuePromise = async () => {
            const total = await fetchTotalIssue();

            setTotalIssue(total);
        };
        handleTotalIssuePromise();
    }, []);

    return (
        <>
            {issueList.map((issue) => {
                return (
                    <>
                        <S.IssueContainer>
                            <S.Number>#{issue.number}</S.Number>
                            <S.Title>{issue.title}</S.Title>
                            <S.Author>{issue.user.login}</S.Author>
                            <S.CommentsNumber>
                                Comments: {issue.comments}
                            </S.CommentsNumber>
                            <S.IssueDate>
                                {issue.created_at && issue.created_at}
                            </S.IssueDate>
                        </S.IssueContainer>
                        <S.IssueBody>
                            <ReactMarkdown>{issue.body}</ReactMarkdown>
                        </S.IssueBody>
                    </>
                );
            })}
            <PageIndex $totalIssue={totalIssue} />
        </>
    );
};
const IssueContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    text-align: center;
`;
const Number = styled.h3`
    grid-row-start: 0;
    grid-row-end: 1;
    grid-column-start: 2;
    grid-column-end: 3;
`;
const Title = styled.div`
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
`;
const Author = styled.h3`
    grid-row-start: 0;
    grid-row-end: 1;
    grid-column-start: 3;
    grid-column-end: 4;
`;
const CommentsNumber = styled.div`
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
`;
const IssueDate = styled.div`
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
`;
const IssueBody = styled.div`
    border: 1px solid;
    width: 90%;
    margin: auto 3em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
`;

const S = {
    IssueContainer,
    Number,
    Title,
    Author,
    CommentsNumber,
    IssueBody,
    IssueDate,
};
