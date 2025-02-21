// 페이지 목록 버튼 구현
// 1. totalIssue을 per_page로 나눈다->totalIndexButton
//     totalIssue
//         지역 변수
//         api 호출로 가져오기
//     perPage
//         지역 변수
//         filter에서 가져오기(우선 10으로 가정)
// 2. caculateIndexNumber
//    역할: 목록 버튼에 들어가는 숫자를 계산한다.
//    한 줄에 숫자 10개씩 총 totalIssue/perPage(totalRow) 줄이 나와야 한다.
//    현재 줄 수(currentRow) : 초기값 1, 지역 변수, useEffect 의존성 변수에 추가
//         다음 버튼을 누르면 currentRow가 1 증가, 이전 버튼을 누르면 currentRow가 1 감소, 최소값은 1
//         맨 앞 버튼을 누르면 currentRow가 1이 됨, 맨 끝 버튼을 누르면 currentRow가 totalRow 값으로 변경
//    숫자 for문: 10번 반복, currentNumber가 현재 값, 초기 값 1
//    숫자: currentRow * 10 + currentNumber
//    계산한 숫자를 indexNumberArray 배열(지역 상태)에 저장한다.
//    사이트 첫 실행 혹은 currentRow가 변경될 때 마다 실행된다.
//    동작 과정: 버튼 클릭->currentRow 변경->caculateIndexNumber 실행->indexNumberArray 변경

// . 랜더링
//     숫자만 반복해서 렌더링
//     각 숫자 태그에 id 값 집어넣기
// . 포커싱
//     버튼을 누르면 ref로 눌린 버튼의 id에 접근->눌린 버튼 파악->pressedNumber
//     pressedNumber가 바뀌면 목록 버튼이 리렌더링 되어야 하므로 상태로 관리
//     pressedNumber가 null이면
//         그냥 렌더링 하기
//     pressedNumber=n이면
//         2번 안쪽 for문의 index가 n-1일 때 값을 [n]으로 하기

import { useDispatch, useSelector } from "react-redux";
import { print, fetchIssueList } from "../context/slicers/issueListSlices";
import React, { useEffect, useState } from "react";
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
    const calculateIndexNumber = () => {
        console.log(totalIssue);
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
            {/* <S.PerPage></S.PerPage> */}

            <div>
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
            </div>
            <S.PageIndex>
                <S.VeryFrontBtn>맨 앞</S.VeryFrontBtn>
                <S.FrontBtn>이전</S.FrontBtn>
                <S.IndexBtnContainer>인덱스</S.IndexBtnContainer>
                <S.BackBtn>다음</S.BackBtn>
                <S.VeryBackBtn>맨 끝</S.VeryBackBtn>
            </S.PageIndex>
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
const PageIndex = styled.div`
    display: flex;
    justify-content: center;
`;
const VeryFrontBtn = styled.button``;
const FrontBtn = styled.button``;
const IndexBtnContainer = styled.div``;
const BackBtn = styled.button``;
const VeryBackBtn = styled.button``;

const S = {
    IssueContainer,
    Number,
    Title,
    Author,
    CommentsNumber,
    IssueBody,
    IssueDate,
    PageIndex,
    VeryFrontBtn,
    FrontBtn,
    IndexBtnContainer,
    BackBtn,
    VeryBackBtn,
};
