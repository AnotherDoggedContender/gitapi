// ?
import { PageIndex } from "../components/PageIndex";
import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slices/issueListSlices";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { current } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";

export const ListPage = () => {
    const { issueList } = useSelector((state) => {
        return state.issueList;
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("currentPage"));
    console.log(currentPage);
    const dispatch = useDispatch();

    const fetchData = async () => {
        dispatch(fetchIssueList(currentPage));
    };

    useEffect(() => {
        fetchData(); //이슈 리스트
    }, [currentPage]);

    return (
        <>
            <S.SetUpContainer>
                <S.InputRepoContainer>
                    <S.OwnerInput placeholder="Owner"></S.OwnerInput>
                    <S.RepoInput placeholder="Repo"></S.RepoInput>
                </S.InputRepoContainer>
                <S.FilterContainer>
                    <S.SortFilter>
                        <S.Option>생성순</S.Option>
                        <S.Option>업데이트순</S.Option>
                        <S.Option>댓글순</S.Option>
                    </S.SortFilter>
                    <S.DirectionFilter>
                        <S.Option>내림차순</S.Option>
                        <S.Option>오름차순</S.Option>
                    </S.DirectionFilter>
                    <S.PerPageFilter>
                        <S.Option>10개 씩</S.Option>
                        <S.Option>20개 씩</S.Option>
                        <S.Option>50개 씩</S.Option>
                    </S.PerPageFilter>
                </S.FilterContainer>
            </S.SetUpContainer>

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
            <PageIndex currentPage={currentPage} />
        </>
    );
};
const SetUpContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const InputRepoContainer = styled.div``;
const OwnerInput = styled.input``;
const RepoInput = styled.input``;
const FilterContainer = styled.div``;
const SortFilter = styled.select``;
const DirectionFilter = styled.select``;
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
    SetUpContainer,
    InputRepoContainer,
    OwnerInput,
    RepoInput,
    FilterContainer,
    SortFilter,
    DirectionFilter,
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
