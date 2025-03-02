import { PageIndex } from "../components/PageIndex";
import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slices/issueListSlices";
import { fetchTotalIssue } from "../context/slices/totalIssueSlice";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { current } from "@reduxjs/toolkit";

export const ListPage = () => {
    const { issueList } = useSelector((state) => {
        return state.issueList;
    });
    const totalIssue = useSelector((state) => {
        return state.totalIssue.totalIssueCount;
    });
    const currentPage = useSelector((state) => {
        return state.currentPage.value;
    });
    const dispatch = useDispatch();
    const fetchTotalIssueNumber = async () => {
        dispatch(fetchTotalIssue());
    };
    const fetchData = async () => {
        dispatch(fetchIssueList(currentPage));
    };

    useEffect(() => {
        console.log("useEffect에서 currentPage:", currentPage);
        fetchData(); //이슈 리스트
    }, [currentPage]);
    useEffect(() => {
        fetchTotalIssueNumber();
    }, []);

    return (
        <>
            {issueList.map((issue) => {
                return (
                    <S.IssueContainer key={issue.number}>
                        <S.IssueInfos>
                            <S.Number>#{issue.number}</S.Number>
                            <S.Title>{issue.title}</S.Title>
                            <S.Author>{issue.user.login}</S.Author>
                            <S.CommentsNumber>
                                Comments: {issue.comments}
                            </S.CommentsNumber>
                            <S.IssueDate>
                                {issue.created_at && issue.created_at}
                            </S.IssueDate>
                        </S.IssueInfos>
                        <S.IssueBody>
                            <ReactMarkdown>{issue.body}</ReactMarkdown>
                        </S.IssueBody>
                    </S.IssueContainer>
                );
            })}
            <PageIndex $totalIssue={totalIssue} />
        </>
    );
};
const IssueContainer = styled.div``;
const IssueInfos = styled.div`
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
    IssueInfos,
    Number,
    Title,
    Author,
    CommentsNumber,
    IssueBody,
    IssueDate,
};
