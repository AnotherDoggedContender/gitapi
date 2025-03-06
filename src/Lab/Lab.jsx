import { useEffect, useState, useRef } from "react";

export const Lab = () => {
    const currentRow = useRef(1);
    const calculate = () => {
        console.log("계산함수 작동");
    };
    useEffect(() => {
        calculate();
    }, [currentRow.current]);
    return (
        <>
            <h1
                onClick={() => {
                    currentRow.current = currentRow.current + 1;
                    console.log(currentRow);
                }}
            >
                연구소
            </h1>
        </>
    );
};
