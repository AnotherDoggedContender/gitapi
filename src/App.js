import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import Layout from "./public/layout/layout";
function App() {
    return (
        <Layout>
            <RouterProvider router={router} />
            <h1>dev</h1>
        </Layout>
    );
}

export default App;
