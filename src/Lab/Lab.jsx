import { useEffect } from "react";

export const Lab = () => {
    const { height, width, title } = {
        title: "menu",
        height: 169.9,
        width: 10,
    };
    console.log(title, height, width);
    return (
        <>
            <h1>연구소</h1>
        </>
    );
};
