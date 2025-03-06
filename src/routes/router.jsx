import { createBrowserRouter } from "react-router-dom";
import { ListPage } from "../pages/ListPage";
import { Lab } from "../Lab/Lab";
console.log(ListPage);
export const router = createBrowserRouter([
    {
        path: "/",
        element: <ListPage></ListPage>,
    },
    {
        path: "/details",
        element: <div>상세 페이지</div>,
    },
    {
        path: "/lab",
        element: <Lab></Lab>,
    },
]);
