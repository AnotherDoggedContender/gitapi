import { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const Lab = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h1
                onClick={() => {
                    setSearchParams({ a: 100 });
                    console.log("QueryString", searchParams.getAll("a"));
                }}
            >
                연구소
            </h1>
        </>
    );
};
