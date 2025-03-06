// 두 필터의 값은 첫 생성 시, 그리고 변경할 때 마다 주소에 들어가야 한다.
import { PageIndex } from "../components/PageIndex";
import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slices/issueListSlices";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { current } from "@reduxjs/toolkit";
import { useLocation, useNavigationType } from "react-router-dom";

export const ListPage = () => {
    const history = window.history;
    const location = useLocation();
    const { issueList } = useSelector((state) => {
        return state.issueList;
    });

    const currentPage = useSelector((state) => {
        return state.currentPage.value;
    });
    const dispatch = useDispatch();

    const fetchData = async () => {
        dispatch(fetchIssueList(currentPage));
    };
    useEffect(() => {
        history.pushState({}, "", `?currentPage=${currentPage}`);
    }, []);
    useEffect(() => {
        fetchData(); //이슈 리스트

        window.addEventListener("popstate", () => {
            console.log("currentPage on URL", location.search);
        });
    }, [currentPage]);

    return (
        <S.IssueListPage>
            <S.FilterContainer>
                <S.TimeFilter>
                    <S.Option value="generation">생성순</S.Option>
                    <S.Option value="update">업데이트순</S.Option>
                    <S.Option value="Comment">댓글순</S.Option>
                </S.TimeFilter>
                <S.PerPageFilter></S.PerPageFilter>
            </S.FilterContainer>
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
            <PageIndex />
        </S.IssueListPage>
    );
};
const IssueListPage = styled.div``;
const FilterContainer = styled.div`
    display: flex;
`;
const TimeFilter = styled.select``;
const PerPageFilter = styled.select``;
const Option = styled.option``;
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
    IssueListPage,
    FilterContainer,
    TimeFilter,
    PerPageFilter,
    Option,
    IssueContainer,
    IssueInfos,
    Number,
    Title,
    Author,
    CommentsNumber,
    IssueBody,
    IssueDate,
};
