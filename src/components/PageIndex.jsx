// 페이지 목록 버튼 구현
// 1. totalIssue을 per_page로 나눈다->totalIndexButton
//     totalIssue
//         지역 변수
//         api 호출로 가져오기
//     perPage
//         지역 변수
//         filter에서 가져오기(우선 50으로 가정)
// 2. 동작 과정
// maxRow: indexNumArray는 한 줄에 숫자 10개씩 총 Math.celi(totalIssue/perPage/10)=maxRow 줄이 나와야 한다.
// 현재 줄 수(currentRow) : 초기값 1, 최대값은 maxRow, 지역 변수, useEffect 의존성 변수에 추가
// 현재 페이지(currentPage): 초기값 1, 최대값은 Math.celi(totalIssue/perPage)=maxPage, 전역 상태, 얘가 바뀌면 focus되는 숫자도 바뀌어야 함
// currentPage: currentRow * 10 + i
// maxPage: currentPage의 최대값
// 1) 숫자 버튼을 누르면
//     currentPage와 눌린 숫자 버튼이 같으면 return
//     아니면 currentPage가 눌린 숫자 버튼으로 바뀐다->가져오는 issue 페이지 변경, []된 숫자 변경
// 2) 이전 버튼을 누르면
//     currentPage가 1이면 return
//     아니면 currentPage % 10 === 1이면 currentRow를 -1하고 indexNumArray를 다시 계산한다.
//     currentPage를 -1한다.
// 3) 다음 버튼을 누르면
//     currentPage가 maxPage이면 return한다.
//     아니면 currentPage % 10 === 0이면 currentRow를 +1하고 indexNumArray를 다시 계산한다.
//     currentPage를 +1한다.
// 4) 맨 앞 버튼을 누르면
//     currentPage가 1이면 return 한다.
//     currentRow가 1이면 currentPage를 1로 바꾼다.
//     currentRow가 1보다 크면 currentRow를 1로 바꾸고 indexNumArray를 다시 계산한다. currentPage를 1로 바꾼다.
// 5) 맨 뒤 버튼을 누르면
//     currentPage가 maxPage이면 return한다.
//     currentPage가 maxRow이면 currentPage를 maxPage로 바꾼다.
//     currentPage가 maxRow보다 작으면 currentRow를 maxRow로 바꾸고 indexNumArray를 다시 계산한다. currentPage를 maxPage로 바꾼다.

// . caculateIndexNumber
//    역할: 목록 버튼에 들어가는 숫자를 계산한다.

//    숫자 for문: 10번 반복, i가 반복문 현재 값, 초기 값 1

//    계산한 숫자를 indexNumberArray 배열(지역 상태)에 저장한다.
//    사이트 첫 실행 혹은 currentRow가 변경될 때 마다 실행된다.
//    동작 과정: 버튼 클릭->currentRow 변경 여부 확인->변경되면 caculateIndexNumber 실행->indexNumberArray 변경 -> 리렌더링
// . onClickCurrentRowBtn
//
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
import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../context/slicers/currentPageSlices";
import styled from "styled-components";

export const PageIndex = ({ $totalIssue }) => {
    const [perPage, setPerPage] = useState(50);
    const [maxRow, setMaxRow] = useState();
    const currentPage = useSelector((state) => {
        console.log("저장소 상태", state);
        return state.currentPage.value.payload;
    });
    const dispatch = useDispatch();
    console.log(currentPage);
    const maxPage = Math.ceil($totalIssue / perPage);
    const [indexNumArray, setIndexNumArray] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    let currentRow = 0;
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
                if (currentPage === 1) break;
                if (currentRow > 1) {
                    currentRow = 1;
                }
                currentPage = 1;
                break;
            case "frontBtn":
                if (currentPage === 1) break;
                if (currentPage % 10 === 1) {
                    currentRow -= 1;
                }
                currentPage -= 1;
                break;
            case "backBtn":
                if (currentPage === maxPage) break;
                if (currentPage % 10 === 0) {
                    currentRow += 1;
                }
                currentPage += 1;
                break;
            case "veryBackBtn":
                if (currentPage === maxPage) break;
                break;
            default:
                console.log("index 버튼 클릭 처리에서 오류 발생");
        }
        console.log(currentRow);
        return currentRow;
    };
    useEffect(() => {
        setMaxRow(Math.floor($totalIssue / perPage / 10) + 1);
    }, []);
    useEffect(() => {
        calculateIndexNumber();
    }, [currentRow]);
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
                                if (number !== currentPage)
                                    dispatch(setCurrentPage(number));
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
