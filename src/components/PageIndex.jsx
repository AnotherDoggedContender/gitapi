// 페이지 목록 버튼 구현
// 1. totalIssue을 per_page로 나눈다->totalIndexButton
//     totalIssue
//         지역 변수
//         api 호출로 가져오기
//     perPage
//         지역 변수
//         filter에서 가져오기(우선 10으로 가정)
// . 동작 과정
// 1) 숫자 버튼을 누르면
//     currentPage와 눌린 숫자 버튼이 같으면 return
//     아니면 currentPage가 눌린 숫자 버튼으로 바뀐다->가져오는 issue 페이지 변경, []된 숫자 변경
// . caculateIndexNumber
//    역할: 목록 버튼에 들어가는 숫자를 계산한다.
//    한 줄에 숫자 10개씩 총 totalIssue/perPage/10 + 1=totalRow 줄이 나와야 한다.
//    현재 줄 수(currentRow) : 초기값 1, 최대값은 totalRow, 지역 변수, useEffect 의존성 변수에 추가
//    현재 페이지(currentPage): 초기값 1, 최대값은 totalIssue/perPage=maxPage, 지역 상태, 얘가 바뀌면 focus되는 숫자도 바뀌어야 함
//    currentPage: currentRow * 10 + i
//    숫자 for문: 10번 반복, i가 반복문 현재 값, 초기 값 1

//    계산한 숫자를 indexNumberArray 배열(지역 상태)에 저장한다.
//    사이트 첫 실행 혹은 currentRow가 변경될 때 마다 실행된다.
//    동작 과정: 버튼 클릭->currentRow 변경 여부 확인->변경되면 caculateIndexNumber 실행->indexNumberArray 변경 -> 리렌더링
// . onClickCurrentRowBtn
//    동작
//         다음 버튼을 누르면
//             currentPage % 10 === 0이고, currentPage !== 0이며 currentPage < maxPage currentRow가 1 증가->calculateIndexNumArray 발동,
//             currentPage가 1 증가,
//         이전 버튼을 누르면
//             currentPage % 10 === 1이고, currentPage !== 1이며 currentPage > 1이면 currentRow가 1 감소->calculateIndexNumArray 발동,
//             currentPage가 1 감소
//         맨 앞 버튼을 누르면
//             currentRow !== 1이면 currentRow가 1이 됨, caculateIndexNumArray 발동
//             아니면 return
//         맨 끝 버튼을 누르면
//             currentRow !== totalRow이면 currentRow가 totalRow 값으로 변경
//             아니면 return
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

export const PageIndex = ({ $totalIssue }) => {
    const [perPage, setPerPage] = useState(50);
    const [totalRow, setTotalRow] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [indexNumArray, setIndexNumArray] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    let currentRow = 1;
    const calculateIndexNumber = () => {
        let indexNumArray = [];
        for (let currentNum = 1; currentNum < 11; currentNum++) {
            indexNumArray.push(currentRow * 10 + currentNum);
        }
        setIndexNumArray(indexNumArray);
    };
    const onClickCurrentRowBtn = (e) => {
        switch (e.target.id) {
            case "veryFrontBtn":
                currentRow = 1;
                break;
            case "frontBtn":
                if (currentRow === 1) break;
                currentRow -= 1;
                break;
            case "backBtn":
                if (currentRow === totalRow) break;
                currentRow += 1;
                break;
            case "veryBackBtn":
                currentRow = totalRow;
                break;
            default:
                console.log("index 버튼 클릭 처리에서 오류 발생");
        }
        console.log(currentRow);
        return currentRow;
    };
    useEffect(() => {
        setTotalRow(Math.floor($totalIssue / perPage / 10) + 1);
    }, []);
    useEffect(() => {
        console.log(currentPage);
    }, [currentPage]);
    return (
        <S.PageIndexContainer>
            <S.VeryFrontBtn onClick={onClickCurrentRowBtn} id="veryFrontBtn">
                맨 앞
            </S.VeryFrontBtn>
            <S.FrontBtn onClick={onClickCurrentRowBtn} id="frontBtn">
                이전
            </S.FrontBtn>
            <S.IndexBtnContainer>
                {indexNumArray.map((number) => {
                    return (
                        <S.IndexNumItem
                            onClick={(e) => {
                                setCurrentPage(number);
                            }}
                        >
                            {number === currentPage ? `[${number}]` : number}
                        </S.IndexNumItem>
                    );
                })}
            </S.IndexBtnContainer>
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
const IndexBtnContainer = styled.div`
    display: flex;
    width: 20%;
    justify-content: space-around;
`;
const IndexNumItem = styled.button`
    border: 0;
    background-color: transparent;
    &.focus {
    }
`;
const BackBtn = styled.button``;
const VeryBackBtn = styled.button``;

const S = {
    PageIndexContainer,
    VeryFrontBtn,
    FrontBtn,
    IndexBtnContainer,
    IndexNumItem,
    BackBtn,
    VeryBackBtn,
};
