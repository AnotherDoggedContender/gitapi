import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
function App() {
    useEffect(() => {
        const fetchIssues = async () => {
            const data = await axios.get(
                "https://api.github.com/repos/angular/angular-cli", {
                    headers: {
                        auth: 
                    }
                }
            );
            const description = await axios.get("https://api.github.com");
            if (data && description) {
                console.log(data);
                console.log(description);
            }
        };
        fetchIssues();
    }, []);

    return <div className="App"></div>;
}

export default App;
