import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>목록 페이지</div>,
    },
    {
        path: "/details",
        element: <div>상세 페이지</div>,
    },
]);
