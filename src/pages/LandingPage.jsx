import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        navigate("/listPage?currentPage=1");
    }, []);
    return <div>누르면 이동</div>;
};
