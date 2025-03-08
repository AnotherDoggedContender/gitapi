import { createBrowserRouter } from "react-router-dom";
import { ListPage } from "../pages/ListPage";
import { Lab } from "../Lab/Lab";
import { LandingPage } from "../pages/LandingPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
    },
    {
        path: "/details",
        element: <div>상세 페이지</div>,
    },
    {
        path: "/listPage",
        element: <ListPage></ListPage>,
    },
    {
        path: "/lab",
        element: <Lab></Lab>,
    },
]);
