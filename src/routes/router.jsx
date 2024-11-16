import { createBrowserRouter } from "react-router-dom";
import { ListPage } from "../pages/ListPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ListPage></ListPage>,
    },
    {
        path: "/details",
        element: <div>상세 페이지</div>,
    },
]);
