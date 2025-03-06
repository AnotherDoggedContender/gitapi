// 페이지 목록 버튼 구현
// currentPage 값은 주소줄에서 나와야 한다. currentPage 변경 시 주소줄에 변경되는 currentPage가 작성되어야 한다.
// 1. totalIssue을 per_page로 나눈다->totalIndexButton
//     totalIssue
//         지역 변수
//         api 호출로 가져오기
//     perPage
//         지역 변수
//         filter에서 가져오기(우선 50으로 가정)
// 2. 동작 과정
// maxRow: indexNumArray는 한 줄에 숫자 10개씩 총 Math.ceil(totalIssue/perPage/10)=maxRow 줄이 나와야 한다.
// 현재 줄 수(currentRow) : 초기값 1, 최대값은 maxRow, 지역 상태, 얘가 바뀔 때 마다 calculateIndexArray가 실행되어야 하므로 useEffect 의존성 변수에 추가,
// 현재 페이지(currentPage): 초기값 1, 최대값은 Math.ceil(totalIssue/perPage)=maxPage, 전역 상태, 얘가 바뀌면 focus되는 숫자도 바뀌어야 함
// indexNumber: currentRow * 10 + i
// currentPage 변경-> currentRow 다시 계산->계산 결과 currentRow 값이 바뀌면 calculateIndexArray 함수 작동
// ``              -> history.pushState로 주소창의 currentPage 변경(setCurrentPage에서 하면 됨)
// popState 이벤트가 발생하면 currentPage를 url에 저장된 값으로 변경하고, 이슈 리스트를 다시 받아와야 한다.
// 1) 숫자 버튼을 누르면
//     currentPage와 눌린 숫자 버튼이 같으면 return
//     아니면 currentPage가 눌린 숫자 버튼으로 바뀐다->가져오는 issue 페이지 변경, []된 숫자 변경
// 2) 이전 버튼을 누르면
//     currentPage가 1이면 return
//     아니면 currentPage를 -1한다.
// 3) 다음 버튼을 누르면
//     currentPage가 maxPage이면 return한다.
//     아니면 currentPage를 +1한다.
// 4) 맨 앞 버튼을 누르면
//     currentPage가 1이면 return 한다.
//     아니면 currentPage를 1로 바꾼다.
// 5) 맨 뒤 버튼을 누르면
//     currentPage가 maxPage이면 return한다.
//     아니면 currentPage를 maxPage로 바꾼다.

// 3. calculateIndexNumber
//    역할: 목록 버튼에 들어가는 숫자를 계산한다.

//    숫자 for문: 10번 반복, i가 반복문 현재 값, 초기 값 1

//    계산한 숫자를 indexNumberArray 배열(지역 상태)에 저장한다.
//    사이트 첫 실행 혹은 currentRow가 변경될 때 마다 실행된다.
//    동작 과정: 버튼 클릭->currentRow 변경 여부 확인->변경되면 calculateIndexNumber 실행->indexNumberArray 변경 -> 리렌더링

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalIssue } from "../context/slices/totalIssueSlice";
import { setCurrentPage } from "../context/slices/currentPageSlices";
import styled from "styled-components";
// 현재 issueList는 31페이지에서 issue 3개만 띄우고 끝난다. ->totalIssue 정답: 303
export const PageIndex = () => {
    const history = window.history;
    const totalIssue = 198;
    const fetchTotalIssueNumber = async () => {
        dispatch(fetchTotalIssue());
    };
    const [perPage, setPerPage] = useState(10); //나중에 ListPage에서 props로 가져와야 함
    const currentRowMemory = useRef();
    const currentPage = useSelector((state) => {
        return state.currentPage.value;
    });
    const dispatch = useDispatch();
    const maxPage = Math.ceil(totalIssue / perPage);
    const [indexNumArray, setIndexNumArray] = useState([]);

    const calculateCurrentRow = (currentPage) => {
        return Math.ceil(currentPage / 10);
    };
    const calculateIndexNumber = () => {
        const currentRow = calculateCurrentRow(currentPage);

        if (currentRowMemory.current === currentRow) return;
        let indexNumArray = [];
        for (let currentNum = 1; currentNum < 11; currentNum++) {
            let indexNum = (currentRow - 1) * 10 + currentNum;
            if (indexNum > maxPage) break;

            indexNumArray.push(indexNum);
        }
        setIndexNumArray(indexNumArray);
    };
    const onClickCurrentRowBtn = (e) => {
        currentRowMemory.current = calculateCurrentRow(currentPage); //페이지 변경 전 currentRow 값 저장
        switch (e.target.id) {
            case "veryFrontBtn":
                if (currentPage === 1) break;
                dispatch(setCurrentPage(1));
                break;
            case "frontBtn":
                if (currentPage === 1) break;
                dispatch(setCurrentPage(currentPage - 1));
                break;
            case "backBtn":
                if (currentPage === maxPage) break;
                dispatch(setCurrentPage(currentPage + 1));
                break;
            case "veryBackBtn":
                if (currentPage === maxPage) break;
                dispatch(setCurrentPage(maxPage));
                break;
            default:
        }
    };
    useEffect(() => {
        calculateIndexNumber();
        history.pushState({}, "");
    }, [currentPage, totalIssue]);
    useEffect(() => {
        fetchTotalIssueNumber();
    }, []);
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
                            key={number}
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
