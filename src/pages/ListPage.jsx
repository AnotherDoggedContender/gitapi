import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slicers/issueListSlices";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
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

    return issueList.map((issue) => {
        return (
            <Issues>
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
            </Issues>
        );
    });
};
const Issues = styled.div``;
const IssueContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    text-align: center;
`;
const Number = styled.div`
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
const Author = styled.div`
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
    margin: auto;
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
