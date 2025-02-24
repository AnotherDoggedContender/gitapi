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
//    한 줄에 숫자 10개씩 총 totalIssue/perPage=totalRow 줄이 나와야 한다.
//    현재 줄 수(currentRow) : 초기값 1, 지역 변수, useEffect 의존성 변수에 추가
//         다음 버튼을 누르면 currentRow가 1 증가, 이전 버튼을 누르면 currentRow가 1 감소, 최소값은 1, 최대값은 totalRow/10
//         맨 앞 버튼을 누르면 currentRow가 1이 됨, 맨 끝 버튼을 누르면 currentRow가 totalRow 값으로 변경
//    숫자 for문: 10번 반복, currentNumber가 현재 값, 초기 값 1
//    숫자: currentRow * 10 + currentNumber
//    계산한 숫자를 indexNumberArray 배열(지역 상태)에 저장한다.
//    사이트 첫 실행 혹은 currentRow가 변경될 때 마다 실행된다.
//    동작 과정: 버튼 클릭->currentRow 변경->caculateIndexNumber 실행->indexNumberArray 변경 -> 리렌더링

// . 랜더링
//     숫자만 반복해서 렌더링
//     각 숫자 태그는 indexNumRef와 연결해서 어떤 숫자가 눌렸는지 확인할 수 있게 하기
// . 포커싱
//     버튼을 누르면 ref로 눌린 버튼의 id에 접근->눌린 버튼 파악->pressedNumber
//     pressedNumber가 바뀌면 목록 버튼이 리렌더링 되어야 하므로 상태로 관리
//     pressedNumber가 null이면
//         그냥 렌더링 하기
//     pressedNumber=n이면
//         2번 안쪽 for문의 index가 n-1일 때 값을 [n]으로 하기
import { useEffect, useState } from "react";
import styled from "styled-components";

export const PageIndex = ($totalIssue) => {
    const [perPage, setPerPage] = useState(50);
    const [totalRow, setTotalRow] = useState();
    const currentRow = 1;

    const calculateIndexNumber = () => {
        console.log($totalIssue);
    };
    const onClickCurrentRowBtn = (e) => {
        switch (e.target.id) {
            case "veryFrontBtn":
        }
    };
    useEffect(() => {
        setTotalRow(Math.floor($totalIssue / perPage) + 1);
    });
    return (
        <S.PageIndexContainer>
            <S.VeryFrontBtn onClick={onClickCurrentRowBtn} id="veryFrontBtn">
                맨 앞
            </S.VeryFrontBtn>
            <S.FrontBtn onClick={onClickCurrentRowBtn} id="frontBtn">
                이전
            </S.FrontBtn>
            <S.IndexBtnContainer>인덱스</S.IndexBtnContainer>
            <S.BackBtn onClick={onClickCurrentRowBtn} id="backBtn">
                다음
            </S.BackBtn>
            <S.VeryBackBtn onClick={onClickCurrentRowBtn} id="veryBackBtn">
                맨 끝
            </S.VeryBackBtn>
        </S.PageIndexContainer>
    );
};
const PageIndexContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const VeryFrontBtn = styled.button``;
const FrontBtn = styled.button``;
const IndexBtnContainer = styled.div``;
const BackBtn = styled.button``;
const VeryBackBtn = styled.button``;

const S = {
    PageIndexContainer,
    VeryFrontBtn,
    FrontBtn,
    IndexBtnContainer,
    BackBtn,
    VeryBackBtn,
};
