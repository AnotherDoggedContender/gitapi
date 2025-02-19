import { useEffect } from "react";

export const Lab = () => {
    let totalItem = null;
    const githubAPIToken = process.env.REACT_APP_GITAPI_TOKEN;
    const fetchTotalItem = async () => {
        try {
            const response = await fetch(
                `https://api.github.com/search/issues?q=repo:angular/angular-cli+is:issue+state:open`,
                {
                    headers: {
                        Accept: "application/vnd.github + json",
                        Authorization: `Bearer ${githubAPIToken}`,
                    },
                }
            );

            const result = await response.json();
            totalItem = result.total_count;
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTotalItem();
    }, []);
    return (
        <>
            <h1>연구소</h1>
            <h2>{totalItem}</h2>
        </>
    );
};
